import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = (element, from, to) => {
  gsap.fromTo(element, from, {
    ...to,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
};

export const staggerAnimateOnScroll = (elements, from, to, stagger = 0.2) => {
    gsap.fromTo(elements, from, {
        ...to,
        stagger,
        scrollTrigger: {
            trigger: elements[0],
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}
