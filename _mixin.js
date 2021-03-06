import { css } from 'styled-components'
import { breakpoints } from './_variables'

export const max = Object.keys(breakpoints).reduce((accumulator, label) => {
    accumulator[label] = (...args) => css`
        @media (max-width: ${breakpoints[label]}) {
            ${css(...args)};
        }
    `
    return accumulator
}, {})

export const min = Object.keys(breakpoints).reduce((accumulator, label) => {
    accumulator[label] = (...args) => css`
        @media (min-width: ${breakpoints[label]}) {
            ${css(...args)};
        }
    `
    return accumulator
}, {})
