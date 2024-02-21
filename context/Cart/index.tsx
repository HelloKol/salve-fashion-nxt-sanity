import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useCookies } from "react-cookie"
import { useMutation, useQuery } from "@apollo/client"
import { graphqlClient } from "@/utils"
import { AuthContext } from "@/context/User"
import {
  CREATE_CART,
  GET_CHECKOUT_CUSTOMER_ASSOCIATE_V2,
  GET_CART,
  GET_LAST_CHECKOUT_ID,
} from "@/services/queries/cart"
import { UPDATE_QUANTITY, REMOVE_FROM_CART } from "@/services/queries"

type ProviderProps = {
  children: ReactNode | ReactNode[]
}

type CartItem = {
  id: string
  title: string
  quantity: number
}

type ShoppingCartContextProps = {
  cart: any
  cartId: string
  toggleProductView: string
  setToggleProductView: (isOpen: string) => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
  totalCartPrice: number
  checkoutUrl: string
  // fetchCartItems: () => void
  lineItemUpdateQuantity: (id: string, quantity: number) => void
  lineItemRemove: (id: string) => void
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(
  undefined
)

export const ShoppingCartProvider = ({ children }: ProviderProps) => {
  const providerValue = ShoppingCartHooks()

  return (
    <ShoppingCartContext.Provider value={providerValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

function ShoppingCartHooks() {
  const userToken = useUserToken()
  const [toggleProductView, setToggleProductView] = useState("big")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [checkoutUrl, setCartUrl] = useState<string>("")
  const [cookies, setCookie, removeCookie] = useCookies(["cartId"])
  const currentCartID: string = cookies["cartId"]

  const {
    loading,
    error,
    data: cart,
    refetch,
  } = useQuery(GET_CART, {
    variables: { cartId: currentCartID },
    skip: !currentCartID,
  })

  const [updateQuantity, {}] = useMutation(UPDATE_QUANTITY, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          cartId: currentCartID,
        },
      },
    ],
  })

  const [removeFromCart, {}] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          cartId: currentCartID,
        },
      },
    ],
  })

  console.log(loading, error, cart)

  useEffect(() => {
    refetch()
  }, [currentCartID])

  useEffect(() => {
    if (!loading) handleCart()
    // if (userToken && currentCartID) fetchCartItems()
  }, [loading, userToken])

  const handleCart = async () => {
    // if (!currentCartID) {
    //   // const cart = await getCartID()
    //   // setCurrentCartID(cart.id)
    //   setCurrentCartID(
    //     `gid://shopify/Cart/Z2NwLWV1cm9wZS13ZXN0NDowMUhRMTRWQVpCRFAzREQzTlQ5RkpTS05UUw`
    //   )
    // }

    if (userToken) handleLoggedInUserCart(userToken)
    else handleAnonymousUserCart()
  }

  // const fetchCart = async (cartId: string) => {
  //   const variables = { cartId }
  //   const response: any = await graphqlClient.request(GET_CART, variables)
  //   return response.cart
  // }

  // const fetchCartItems = async () => {
  //   const checkout = await fetchCart(currentCartID)
  //   setCartItems(checkout)
  //   setCartUrl(checkout?.webUrl)
  //   setTotalCartPrice(parseFloat(checkout?.totalPrice.amount))
  // }

  // const getCartID = async () => {
  //   const cartId = await fetchUserCartID(userToken)
  //   return cartId ? { id: cartId } : await createNewCart()
  // }

  // const fetchUserCartID = async (userToken: string | undefined) => {
  //   if (!userToken) return null
  //   const variables = { customerAccessToken: userToken }
  //   const response: any = await graphqlClient.request(
  //     GET_LAST_CHECKOUT_ID,
  //     variables
  //   )
  //   return response.customer?.lastIncompleteCart?.id
  // }

  // const setCurrentCartID = (cartId: string) => {
  //   currentCartID = cartId
  //   setCookie("cartId", currentCartID, { path: "/" })
  // }

  const createNewCart = async () => {
    const response: any = await graphqlClient.request(CREATE_CART)
    setCookie("cartId", response.cartCreate.cart.id, { path: "/" })
    return response
  }

  const handleLoggedInUserCart = async (userToken: string) => {
    const customer = await getCustomer(userToken)
    console.log(customer, "customer")
    if (customer && customer?.lastIncompleteCart) {
      return setCookie("cartId", customer.lastIncompleteCart.id, { path: "/" })
    } else {
      handleAnonymousUserCart()
      return await associateCartWithCustomer(userToken)
    }
  }

  const handleAnonymousUserCart = async () => {
    const existingCheckout = cart?.cart?.id
    if (!existingCheckout) removeCookie("cartId", { path: "/" })
    if (!userToken && !currentCartID) createNewCart()
  }

  const getCustomer = async (userToken: string) => {
    const variables = { customerAccessToken: userToken }
    const response: any = await graphqlClient.request(
      GET_LAST_CHECKOUT_ID,
      variables
    )
    return response.customer
  }

  const associateCartWithCustomer = async (userToken: string) => {
    let response: any = {
      checkoutCustomerAssociateV2: {
        checkout: {},
      },
    }
    const variables = {
      cartId: currentCartID,
      customerAccessToken: userToken,
    }
    try {
      response = await graphqlClient.request(
        GET_CHECKOUT_CUSTOMER_ASSOCIATE_V2,
        variables
      )
    } catch {}
    const checkout = response.checkoutCustomerAssociateV2.checkout
    if (!checkout) removeCookie("cartId", { path: "/" })
  }

  const lineItemUpdateQuantity = async (
    lineItemId: string,
    newQuantity: number
  ) => {
    const variables = {
      cartId: currentCartID,
      lines: { id: lineItemId, quantity: newQuantity },
    }

    return updateQuantity({ variables })
  }

  const lineItemRemove = async (lineItemId: string) => {
    const variables = {
      cartId: currentCartID,
      lineIds: [lineItemId],
    }

    return removeFromCart({ variables })
  }

  return {
    cart,
    cartId: currentCartID,
    toggleProductView,
    setToggleProductView,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    totalCartPrice,
    checkoutUrl,
    // fetchCartItems,
    lineItemUpdateQuantity,
    lineItemRemove,
  }
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  if (!context) throw new Error("Something went wrong with the Auth Context")
  return context
}

function useUserToken() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("Something went wrong with the Auth Context")
  return context.accessToken
}
