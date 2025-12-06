import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px',
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        'transition-all duration-700 ease-out',
        isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}
