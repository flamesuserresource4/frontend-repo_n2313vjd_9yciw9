import Spline from '@splinetool/react-spline';

export function Hero3D() {
  return (
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-2xl overflow-hidden border border-white/10">
      <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
    </div>
  );
}
