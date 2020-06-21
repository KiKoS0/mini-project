import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'

const whiteList = ['/auth', '/', '/news']

router.beforeEach(async (to: Route, _: Route, next: any) => { //eslint-disable-line

    // Determine whether the user has logged in
    if (UserModule.token) {
        if (to.path === '/auth') {
            // If is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            // Check whether the user has obtained his user info
            if (UserModule.id === '') {
                try {
                    // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
                    await UserModule.GetUserInfo()

                    // Here we can dynamically add routes to the user depending on his roles (if added later)

                    next({ ...to, replace: true })

                } catch (err) {
                    // Remove token and redirect to login page
                    UserModule.ResetToken()
                    next(`/auth?redirect=${to.path}`)
                }
            } else {
                next()
            }
        }
    } else {
        // Has no token
        if (whiteList.indexOf(to.path) !== -1) {
            // In the free login whitelist, go directly
            next()
        } else {
            // Other pages that do not have permission to access are redirected to the login page.
            next(`/auth?redirect=${to.path}`)
        }
    }
})
