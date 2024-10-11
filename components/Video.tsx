export function Video() {
    return (
      <video width="896" height="1152" preload="true" className="h-[490px] md:h-[660px] w-auto md:float-right" autoPlay loop muted>
        <source src="/video.mp4" type="video/mp4" />
      </video>
    )
  }