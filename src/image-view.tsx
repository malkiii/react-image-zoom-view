import React from 'react';
import { motion } from 'framer-motion';

type ImageViewProps = React.ComponentPropsWithoutRef<typeof motion.img> & {
  aspectRatio: `${number}/${number}`;
};

export function ImageView({ aspectRatio, className, ...props }: ImageViewProps) {
  const {
    isOpen,
    bounds,
    fullScreenClass,
    isZooming,
    imageRef,
    toggleOpen,
    handleTouchEvents,
    handleMouseEvents,
    exit,
  } = useImageViewControls();

  return (
    <div style={{ aspectRatio }}>
      <div
        onClick={() => exit()}
        className={cn(
          'fixed inset-0 bg-black/65 touch-none transition-opacity duration-300',
          !isOpen && 'pointer-events-none opacity-0',
        )}
      />
      <motion.img
        ref={imageRef}
        {...props}
        layout={true}
        drag={isOpen}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600 }}
        dragConstraints={{
          top: Math.min(0, bounds / 2),
          left: -Math.max(0, bounds / 2),
          right: Math.max(0, bounds / 2),
          bottom: -Math.min(0, bounds / 2),
        }}
        animate={bounds ? undefined : { x: 0, y: 0 }}
        transition={{ ease: 'circOut', duration: 0.3 }}
        onClick={() => !isOpen && toggleOpen()}
        // handle mouse events
        onMouseDown={handleMouseEvents}
        onMouseMove={handleMouseEvents}
        onMouseUp={handleMouseEvents}
        // handle touch events
        onTouchStartCapture={handleTouchEvents}
        onTouchEndCapture={handleTouchEvents}
        onTouchMoveCapture={handleTouchEvents}
        className={cn(
          className,
          isOpen && 'fixed left-1/2 [translate:-50%_-50%] top-1/2 max-w-none',
          isZooming ? 'cursor-zoom-out' : isOpen ? 'cursor-zoom-in' : 'cursor-pointer',
          isZooming
            ? cn('cursor-zoom-out rounded-none', bounds > 0 ? 'h-dvh' : 'w-full')
            : isOpen && fullScreenClass,
        )}
      />
    </div>
  );
}

// Custom hook to control all the image view logic
function useImageViewControls() {
  const [isOpen, setOpen] = React.useState(false);
  const [fullScreenClass, setFullScreenClass] = React.useState('');

  const [isZooming, setIsZooming] = React.useState(false);
  const [bounds, setBounds] = React.useState(0);

  const imageRef = React.useRef<HTMLImageElement>(null);

  const toggleOpen = React.useCallback(() => {
    setOpen((curr) => !curr);

    if (!imageRef.current) return;

    const { offsetWidth: width, offsetHeight: height } = imageRef.current;
    const isPortrait = width < height;

    if (window.innerWidth / width < window.innerHeight / height) {
      setFullScreenClass(cn('w-full', !isPortrait && 'max-w-5xl'));
    } else {
      setFullScreenClass(isPortrait ? 'h-dvh' : 'h-[75dvh]');
    }
  }, []);

  const toggleZoom = React.useCallback(() => {
    setIsZooming((curr) => {
      if (curr) {
        setBounds(0);
      } else if (imageRef.current) {
        const widthRatio = window.innerWidth / imageRef.current.offsetWidth;
        const heightRatio = window.innerHeight / imageRef.current.offsetHeight;

        if (widthRatio < heightRatio) {
          const fullWidth = imageRef.current.offsetWidth * heightRatio;
          setBounds(fullWidth - window.innerWidth);
        } else {
          const fullHeight = imageRef.current.offsetHeight * widthRatio;
          setBounds(window.innerHeight - fullHeight);
        }
      }

      // hide the scrollbar
      document.body.style.overflow = curr ? '' : 'hidden';

      return !curr;
    });
  }, []);

  // Exit the image view
  const exit = React.useCallback(
    (e?: KeyboardEvent) => {
      if (!isOpen || (e && e.key !== 'Escape')) return;
      setBounds(0);
      setIsZooming(false);
      toggleOpen();
    },
    [isOpen, toggleOpen],
  );

  // Handle touch events
  const lastTap = React.useRef(0);
  const handleTouchEvents = React.useCallback(
    (e: React.TouchEvent<HTMLImageElement>) => {
      if (e.touches.length > 1) return;
      if (isOpen && e.type === 'touchend') return e.preventDefault();

      const currentTime = new Date().getTime();

      if (e.type === 'touchmove') {
        lastTap.current = 0;
        return;
      }

      if (e.type === 'touchstart') {
        const tapLength = currentTime - lastTap.current;

        if (isOpen && tapLength > 0 && tapLength < 300) {
          toggleZoom();
        }
      }

      lastTap.current = currentTime;
    },
    [isOpen, toggleZoom],
  );

  // Handle mouse events
  const shouldZoom = React.useRef(false);
  const handleMouseEvents = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (e.type === 'mousedown') {
        shouldZoom.current = isOpen;
      } else if (e.type === 'mousemove') {
        shouldZoom.current = false;
      } else if (e.type === 'mouseup' && shouldZoom.current) {
        toggleZoom();
      }
    },
    [isOpen, toggleZoom],
  );

  // Handle Escape key press
  React.useEffect(() => {
    window.addEventListener('keydown', exit);
    return () => window.removeEventListener('keydown', exit);
  }, [exit]);

  return {
    isOpen,
    bounds,
    fullScreenClass,
    isZooming,
    imageRef,
    toggleOpen,
    toggleZoom,
    handleTouchEvents,
    handleMouseEvents,
    exit,
  };
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ').trim();
}
