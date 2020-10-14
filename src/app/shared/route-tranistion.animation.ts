import { trigger, transition, style, query, group, animateChild, animate, state } from '@angular/animations';
export const routeTransitionAnimations = trigger('triggerName', 

   [ transition('* => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], {optional: true}),
        query(':enter', [style({ right: '-100%', opacity: 0 })], {optional: true}),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))], {optional: true}),
          query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))], {optional: true})
         ]),
         query(':enter', animateChild(), {optional: true})
       ])
]

);