import React from "react"
import * as Slider from "@radix-ui/react-slider"
import styles from "./styles.module.scss"

const RadixSlider = () => (
  <div>
    <div>
      <span>10</span>
      <span>BPM</span>
      <span>90</span>
    </div>

    <Slider.Root min={10} max={90} className={styles.SliderRoot}>
      <Slider.Track className={styles.SliderTrack}>
        <Slider.Range className={styles.SliderRange} />
      </Slider.Track>
      <Slider.Thumb className={styles.SliderThumb} />
      <Slider.Thumb className={styles.SliderThumb} />
    </Slider.Root>

    <div>
      <div>
        <button>slow</button>
      </div>
      <div>
        <button>med</button>
      </div>
    </div>
  </div>
)

export default RadixSlider
