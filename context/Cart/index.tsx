import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { graphqlClient } from "@/utils";
import { AuthContext } from "@/context/User";
import {
  GET_CHECKOUT_CREATE_MUTATION,
  GET_CHECKOUT_CUSTOMER_ASSOCIATE_V2,
  GET_CHECKOUT_QUERY,
  GET_CUSTOMER_QUERY,
} from "@/services/queries/cart";

type ProviderProps = {
  children: ReactNode | ReactNode[];
};

type CartItem = {
  id: string;
  title: string;
  quantity: number;
};

type ShoppingCartContextProps = {
  toggleProductView: string;
  setToggleProductView: (isOpen: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  totalCheckoutPrice: number;
  checkoutUrl: string;
  fetchCartItems: () => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(
  undefined
);

export const ShoppingCartProvider = ({ children }: ProviderProps) => {
  const providerValue = ShoppingCartHooks();

  return (
    <ShoppingCartContext.Provider value={providerValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

function ShoppingCartHooks() {
  const userToken = useUserToken();
  const [toggleProductView, setToggleProductView] = useState("big");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["checkoutId"]);
  let currentCheckoutId: string = cookies["checkoutId"];

  useEffect(() => {
    handleCheckout(userToken);
    if (userToken && currentCheckoutId) fetchCartItems();
  }, [userToken, currentCheckoutId]);

  const handleCheckout = async (userToken: string | undefined) => {
    if (!currentCheckoutId) {
      const newCheckout = await createCheckout();
      setCurrentCheckoutId(newCheckout.id);
    }
    if (userToken) handleLoggedInUserCheckout(userToken);
    else handleAnonymousUserCheckout();
  };

  const fetchCheckout = async (checkoutId: string) => {
    const variables = { checkoutId };
    const response: any = await graphqlClient.request(
      GET_CHECKOUT_QUERY,
      variables
    );
    return response.node;
  };

  const fetchCartItems = async () => {
    const checkout = await fetchCheckout(currentCheckoutId);
    updateCartItems(checkout);
    setCheckoutUrl(checkout?.webUrl);
    setTotalCheckoutPrice(parseFloat(checkout?.totalPriceV2.amount));
  };

  const createCheckout = async () => {
    const checkoutId = await fetchUserCheckoutId(userToken);
    return checkoutId ? { id: checkoutId } : await createNewCheckout();
  };

  const fetchUserCheckoutId = async (userToken: string | undefined) => {
    if (!userToken) return null;
    const variables = { customerAccessToken: userToken };
    const response: any = await graphqlClient.request(
      GET_CUSTOMER_QUERY,
      variables
    );
    return response.customer?.lastIncompleteCheckout?.id;
  };

  const setCurrentCheckoutId = (checkoutId: string) => {
    currentCheckoutId = checkoutId;
    setCookie("checkoutId", currentCheckoutId, { path: "/" });
  };

  const createNewCheckout = async () => {
    const response: any = await graphqlClient.request(
      GET_CHECKOUT_CREATE_MUTATION
    );
    return response.checkoutCreate.checkout;
  };

  const handleLoggedInUserCheckout = async (userToken: string) => {
    const customer = await getCustomer(userToken);
    if (customer && customer?.lastIncompleteCheckout) {
      setCurrentCheckoutId(customer.lastIncompleteCheckout.id);
    } else {
      await associateCheckoutWithCustomer(userToken);
      handleAnonymousUserCheckout();
    }
  };

  const getCustomer = async (userToken: string) => {
    const variables = { customerAccessToken: userToken };
    const response: any = await graphqlClient.request(
      GET_CUSTOMER_QUERY,
      variables
    );
    return response.customer;
  };

  const associateCheckoutWithCustomer = async (userToken: string) => {
    let response: any = {
      checkoutCustomerAssociateV2: {
        checkout: {},
      },
    };
    const variables = {
      checkoutId: currentCheckoutId,
      customerAccessToken: userToken,
    };
    try {
      response = await graphqlClient.request(
        GET_CHECKOUT_CUSTOMER_ASSOCIATE_V2,
        variables
      );
    } catch {}
    const checkout = response.checkoutCustomerAssociateV2.checkout;
    if (!checkout) removeCookie("checkoutId");
  };

  const handleAnonymousUserCheckout = async () => {
    const checkout = await fetchCheckout(currentCheckoutId);
    if (checkout) {
      fetchCartItems();
    } else {
      removeCookie("checkoutId");
    }
  };

  const updateCartItems = (checkout: any) => {
    const items = checkout.lineItems.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      quantity: node.quantity,
      variant: node.variant,
    }));
    setCartItems(items);
  };

  return {
    toggleProductView,
    setToggleProductView,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    totalCheckoutPrice,
    checkoutUrl,
    fetchCartItems,
  };
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) throw new Error("Something went wrong with the Auth Context");
  return context;
}

function useUserToken() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Something went wrong with the Auth Context");
  return context.accessToken;
}
