/* eslint global-require: off, import/no-dynamic-require: off */

/**
 * Styleguide pages are dynamically imported from:
 *
 *     *.styleguide.jsx
 *
 * You are strongly invited to provide styleguides for your common and
 * reusable components.
 */

const components = process.env.STYLEGUIDE.map(({ component, ...def }) => ({
    ...def,
    component: require(`root/${component}`).default,
}))

export default components
