export function Video() {
    return (
      <video width="720" height="960" preload="true" className="h-[490px] md:h-[660px] w-auto md:float-right" autoPlay loop muted>
        <source src="/v1.mp4" type="video/mp4" />
      </video>
    )
  }