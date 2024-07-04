import Lottie from '@lottielab/lottie-player/react';

export default function Loader() {
  return (
    <div className='w-full h-svh flex justify-center items-center'>
      {/* <LoaderCircle  className='animate-spin' size={32} /> */}
      <div className='w-32'>
      <Lottie src="https://cdn.lottielab.com/l/8H6yq6f1qfBCtx.json" autoplay />
      </div>
    </div>
  )
}