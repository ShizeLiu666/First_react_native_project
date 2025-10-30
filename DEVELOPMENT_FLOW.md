# Fast Food App - Development Flow & Progress Tracker

## Current Status

**Last Updated**: 2025-10-30

### Architecture Status
- ✅ **Phase 0 Complete**: Design foundation, assets, Tailwind config, TypeScript setup
- ✅ Project scaffolding complete
- ✅ Expo Router setup
- ✅ NativeWind/Tailwind configuration
- ✅ TypeScript configuration
- ✅ Basic UI components created (CustomButton, CustomInput, CartButton)
- ⚠️ Additional UI components needed (MenuCard, CartItem, etc.)
- ❌ State management not implemented
- ❌ API integration layer missing
- ❌ Authentication not connected to backend

---

## Phase 0: Design Foundation ✅ COMPLETED

**Goal**: Establish design system and project structure before coding
 
### 0.1 UI/UX Design
- [x] Design all screens in Figma
  - [x] Authentication screens (sign-in, sign-up)
  - [x] Home screen (menu items, categories, offers)
  - [x] Search screen
  - [x] Cart screen
  - [x] Profile screen
  - [x] Product detail/customization screen
  - [x] Order confirmation screen
- [x] Define design system
  - [x] Color palette (primary, secondary, grays, semantic colors)
  - [x] Typography scale (font families, sizes, weights)
  - [x] Spacing system (margins, padding)
  - [x] Component library (buttons, inputs, cards)
  - [x] Icons and illustrations

### 0.2 Project Setup
- [x] Initialize Expo project with TypeScript
- [x] Install and configure Expo Router
- [x] Set up directory structure
  - [x] `app/` for screens (file-based routing)
  - [x] `components/` for reusable components
  - [x] `constants/` for static data
  - [x] `assets/` for images, icons, fonts

### 0.3 Configure Design Tokens
- [x] Set up `tailwind.config.js`
  - [x] Custom color palette:
    - `primary: #FE8C00` (orange)
    - `white`, `gray`, `dark`, `error`, `success`
  - [x] Custom font families (Quicksand: Regular, Bold, SemiBold, Medium)
  - [x] Spacing, border radius values
- [x] Configure NativeWind
  - [x] `babel.config.js` with NativeWind preset
  - [x] `metro.config.js` integration
  - [x] `postcss.config.js` setup

### 0.4 Import & Organize Assets
- [x] Import all assets into `assets/`
  - [x] Icons (home, search, cart, profile, etc.)
  - [x] Images (logo, products, graphics)
  - [x] Fonts (Quicksand variants)
- [x] Create `constants/index.ts`
  - [x] Export icon/image imports
  - [x] Define categories array
  - [x] Define promotional offers
  - [x] Define toppings/sides data

### 0.5 TypeScript Configuration
- [x] Create `images.d.ts` for image module declarations
- [x] Create `nativewind-env.d.ts` for NativeWind types
- [x] Create `type.d.ts` for app-specific interfaces
  - [x] `MenuItem`, `Category`, `User`
  - [x] `CartItemType`, `CartStore`
  - [x] Component props interfaces
  - [x] API parameter interfaces
- [x] Configure `tsconfig.json`
  - [x] Enable strict mode
  - [x] Set up path aliases (`@/*`)

### 0.6 Root Layout & Global Styles
- [x] Update `app/_layout.tsx`
  - [x] Implement `RootLayout()` with font loading
  - [x] Configure splash screen behavior
  - [x] Set up Stack navigator
- [x] Create `app/globals.css`
  - [x] Tailwind directives
  - [x] Utility classes (flex-center, flex-between, etc.)
  - [x] Component classes (custom-btn, menu-card, cart-item, etc.)
  - [x] Typography classes (h1-bold, paragraph-semibold, etc.)

### 0.7 Initial Component Library
- [x] Create `components/CustomButton.tsx`
  - [x] Props: title, onPress, style, leftIcon, isLoading
  - [x] Loading state with ActivityIndicator
- [x] Create `components/CustomInput.tsx`
  - [x] Props: label, placeholder, value, onChangeText, secureTextEntry
  - [x] Focus state with visual feedback
- [x] Create `components/CartButton.tsx`
  - [x] Cart icon with badge counter

---

## Phase 1: Foundation (Core Infrastructure)

**Goal**: Build the essential infrastructure before feature development

### 1.1 Environment & Configuration
- [ ] Install additional dependencies
  - [ ] `expo-secure-store` for token storage
  - [ ] `zustand` for state management (recommended)
  - [ ] `react-native-toast-message` for notifications
  - [ ] `@tanstack/react-query` for data fetching (optional but recommended)
- [ ] Set up environment variables
  - [ ] Create `.env` file (add to `.gitignore`)
  - [ ] Add `EXPO_PUBLIC_API_URL` for backend URL
  - [ ] Add `EXPO_PUBLIC_API_TIMEOUT` (optional)
- [ ] Update `app.json` with environment-specific config

### 1.2 Utility Functions
- [ ] Create `utils/` directory
- [ ] Create `utils/formatters.ts`
  - [ ] `formatPrice(amount: number): string` - Format currency
  - [ ] `formatDate(date: Date): string` - Format dates
  - [ ] `truncateText(text: string, length: number): string`
- [ ] Create `utils/validators.ts`
  - [ ] `validateEmail(email: string): boolean`
  - [ ] `validatePassword(password: string): { valid: boolean, message: string }`
  - [ ] `validatePhone(phone: string): boolean` (optional)

### 1.3 API Service Layer
- [ ] Create `services/` directory
- [ ] Create `services/api.ts` (base HTTP client)
  - [ ] Configure base URL from environment variables
  - [ ] Create axios/fetch wrapper with TypeScript types
  - [ ] Add request interceptor (inject auth token)
  - [ ] Add response interceptor (handle errors globally)
  - [ ] Create error handling utility
  - [ ] Add timeout configuration
- [ ] Create `services/auth.service.ts`
  - [ ] `signIn(email: string, password: string): Promise<{ token: string, user: User }>`
  - [ ] `signUp(data: CreateUserParams): Promise<{ token: string, user: User }>`
  - [ ] `logout(): Promise<void>`
  - [ ] `refreshToken(): Promise<{ token: string }>` (optional)
  - [ ] `getCurrentUser(): Promise<User>`
- [ ] Create `services/menu.service.ts`
  - [ ] `getMenuItems(params?: GetMenuParams): Promise<MenuItem[]>`
  - [ ] `getCategories(): Promise<Category[]>`
  - [ ] `getMenuItem(id: string): Promise<MenuItem>`
  - [ ] `searchMenuItems(query: string): Promise<MenuItem[]>`
- [ ] Create `services/order.service.ts`
  - [ ] `createOrder(items: CartItemType[], total: number): Promise<Order>`
  - [ ] `getOrderHistory(): Promise<Order[]>`
  - [ ] `getOrderById(id: string): Promise<Order>`
  - [ ] `cancelOrder(id: string): Promise<void>` (optional)

### 1.4 State Management
- [ ] Choose state management solution
  - **Recommended**: Zustand (lightweight, TypeScript-friendly)
  - Alternative: Context API (built-in, more verbose)
- [ ] Create `store/` directory
- [ ] Create `store/cartStore.ts`
  - [ ] Implement `CartStore` interface from `type.d.ts`
  - [ ] `items: CartItemType[]` state
  - [ ] `addItem(item: CartItemType): void`
  - [ ] `removeItem(itemId: string): void`
  - [ ] `increaseQty(itemId: string): void`
  - [ ] `decreaseQty(itemId: string): void`
  - [ ] `clearCart(): void`
  - [ ] `getTotalItems(): number` (computed)
  - [ ] `getTotalPrice(): number` (computed)
  - [ ] Persist cart to AsyncStorage (optional)
- [ ] Create `store/authStore.ts` or `contexts/AuthContext.tsx`
  - [ ] `user: User | null` state
  - [ ] `token: string | null` state
  - [ ] `isAuthenticated: boolean` (computed)
  - [ ] `isLoading: boolean` (initial auth check)
  - [ ] `signIn(email: string, password: string): Promise<void>`
  - [ ] `signUp(data: CreateUserParams): Promise<void>`
  - [ ] `signOut(): Promise<void>`
  - [ ] `checkAuth(): Promise<void>` (restore session on app launch)
  - [ ] Integrate with `expo-secure-store` for token persistence

### 1.5 Custom Hooks
- [ ] Create `hooks/` directory
- [ ] Create `hooks/useAuth.ts`
  - [ ] Wrapper around auth store/context
  - [ ] Returns `{ user, isAuthenticated, isLoading, signIn, signUp, signOut }`
- [ ] Create `hooks/useCart.ts`
  - [ ] Wrapper around cart store
  - [ ] Returns cart state and methods
- [ ] Create `hooks/useToast.ts` (optional)
  - [ ] Wrapper around toast library
  - [ ] `showSuccess(message: string)`
  - [ ] `showError(message: string)`
  - [ ] `showInfo(message: string)`

### 1.6 Complete Authentication Flow
- [ ] Update `app/(tabs)/_layout.tsx`
  - [ ] Remove hardcoded `isAuthenticated = false`
  - [ ] Use `useAuth()` hook to check authentication
  - [ ] Redirect to `/(auth)/sign-in` if not authenticated
  - [ ] Show loading state while checking auth
- [ ] Update `app/(auth)/sign-in.tsx`
  - [ ] Connect form to `authStore.signIn()` or `useAuth().signIn()`
  - [ ] Add form validation (email format, password length)
  - [ ] Show loading state during sign-in
  - [ ] Handle errors (invalid credentials, network errors)
  - [ ] Navigate to `/(tabs)` on success
  - [ ] Add "Remember me" checkbox (optional)
- [ ] Update `app/(auth)/sign-up.tsx`
  - [ ] Create sign-up form UI
  - [ ] Connect to `authStore.signUp()`
  - [ ] Add form validation (password confirmation, email format)
  - [ ] Show loading state
  - [ ] Handle errors
  - [ ] Navigate to `/(tabs)` or `sign-in` on success
- [ ] Implement token persistence
  - [ ] Store token in SecureStore on sign-in/sign-up
  - [ ] Load token from SecureStore on app launch
  - [ ] Clear token on sign-out
- [ ] Add logout functionality
  - [ ] Implement in profile screen
  - [ ] Clear token from SecureStore
  - [ ] Reset auth state
  - [ ] Navigate to `/(auth)/sign-in`

---

## Phase 2: Navigation & UI Components

**Goal**: Complete navigation structure and build reusable components

### 2.1 Tab Bar Navigation
- [ ] Update `app/(tabs)/_layout.tsx`
  - [ ] Implement `Tabs` component from `@react-navigation/bottom-tabs`
  - [ ] Configure 4 tabs: Home, Search, Cart, Profile
  - [ ] Add tab icons from `assets/icons/`
  - [ ] Add tab labels (optional, can be icon-only)
  - [ ] Style active/inactive states (use Tailwind colors)
  - [ ] Add custom cart badge to Cart tab (show item count)
  - [ ] Configure tab bar appearance (background, shadow, height)

### 2.2 Common UI Components
Build these components BEFORE implementing screens that use them:

- [ ] `components/MenuCard.tsx`
  - [ ] Props: `item: MenuItem`, `onPress?: () => void`, `onAddToCart?: () => void`
  - [ ] Display product image, name, price
  - [ ] Add to cart button
  - [ ] Optional: Show "New" or "Popular" badge
  - [ ] Use Tailwind class `.menu-card`

- [ ] `components/CartItem.tsx`
  - [ ] Props: `item: CartItemType`, `onIncrease`, `onDecrease`, `onRemove`
  - [ ] Display item image, name, price
  - [ ] Show customizations (toppings, sides)
  - [ ] Quantity controls (+/- buttons)
  - [ ] Remove button
  - [ ] Calculate and show subtotal (price × quantity)
  - [ ] Use Tailwind class `.cart-item`

- [ ] `components/SearchBar.tsx`
  - [ ] Props: `value`, `onChangeText`, `onSubmit`, `placeholder`
  - [ ] Search icon
  - [ ] Clear button (when text exists)
  - [ ] Auto-focus capability
  - [ ] Use Tailwind class `.searchbar`

- [ ] `components/OfferCard.tsx`
  - [ ] Props: `offer: { image, title, discount }`, `onPress?`
  - [ ] Promotional banner with image
  - [ ] Discount text overlay
  - [ ] Tap to view details
  - [ ] Use Tailwind class `.offer-card`

- [ ] `components/CategoryFilter.tsx`
  - [ ] Props: `category: Category`, `isActive: boolean`, `onPress`
  - [ ] Category icon and name
  - [ ] Active/inactive states
  - [ ] Horizontal scrollable chip
  - [ ] Use Tailwind class `.filter`

- [ ] `components/ProfileField.tsx`
  - [ ] Props: `label`, `value`, `editable`, `onChangeText`, `icon?`
  - [ ] Display label and value
  - [ ] Edit mode with input
  - [ ] Optional icon
  - [ ] Use Tailwind class `.profile-field`

- [ ] `components/LoadingSpinner.tsx`
  - [ ] Props: `size?: 'small' | 'large'`, `color?`
  - [ ] Centered ActivityIndicator
  - [ ] Optional overlay background

- [ ] `components/EmptyState.tsx`
  - [ ] Props: `title`, `message`, `actionLabel?`, `onAction?`
  - [ ] Empty illustration
  - [ ] Title and description text
  - [ ] Optional action button

- [ ] `components/LoadingSkeleton.tsx` (optional)
  - [ ] Props: `type: 'menu-card' | 'cart-item' | 'profile'`
  - [ ] Animated skeleton for different content types
  - [ ] Use for better loading UX

---

## Phase 3: Feature Development (Screen by Screen)

**Goal**: Build features incrementally, one complete screen at a time

### 3.1 Home Screen (`app/(tabs)/index.tsx`)

**Build order**: Components → Data fetching → UI assembly

- [ ] Set up data fetching
  - [ ] Create `useMenuItems()` hook (or use React Query)
  - [ ] Fetch menu items on mount
  - [ ] Fetch categories on mount
  - [ ] Handle loading and error states

- [ ] Implement header section
  - [ ] App logo
  - [ ] Cart button (use `CartButton` component)
  - [ ] Show cart item count badge

- [ ] Implement category filters
  - [ ] Horizontal ScrollView with `CategoryFilter` components
  - [ ] "All" category option
  - [ ] Track active category state
  - [ ] Filter menu items when category changes

- [ ] Implement featured offers carousel
  - [ ] Horizontal ScrollView with `OfferCard` components
  - [ ] Auto-scroll every 3-5 seconds (optional)
  - [ ] Pagination dots indicator (optional)
  - [ ] Tap to view offer details

- [ ] Implement menu items grid
  - [ ] FlatList with `MenuCard` components
  - [ ] 2-column grid layout
  - [ ] Pull-to-refresh functionality
  - [ ] Pagination or "Load more" (if many items)
  - [ ] Show loading skeleton on initial load
  - [ ] Show empty state if no items

- [ ] Implement "Add to cart" functionality
  - [ ] Tap card or "+" button to add item
  - [ ] If item has customizations, open Product Detail modal
  - [ ] If no customizations, directly add to cart
  - [ ] Show success toast notification
  - [ ] Trigger haptic feedback
  - [ ] Update cart badge count

### 3.2 Search Screen (`app/(tabs)/search.tsx`)

- [ ] Implement SearchBar component integration
  - [ ] Auto-focus on tab switch
  - [ ] Clear button functionality

- [ ] Implement debounced search
  - [ ] Add debounce utility (300ms delay)
  - [ ] Call search API only after user stops typing
  - [ ] Show loading indicator during search

- [ ] Implement category filters
  - [ ] Reuse CategoryFilter components
  - [ ] Filter search results by category

- [ ] Implement search results list
  - [ ] FlatList with `MenuCard` components
  - [ ] Display matching menu items
  - [ ] Show "No results" empty state
  - [ ] Clear results when search is cleared

- [ ] Add "Recent searches" (optional)
  - [ ] Store recent search queries in AsyncStorage
  - [ ] Display below search bar when not searching
  - [ ] Tap to re-search

- [ ] Implement "Add to cart" from results
  - [ ] Same logic as home screen
  - [ ] Show success feedback

### 3.3 Product Detail Screen/Modal (`app/product/[id].tsx` or modal)

**Note**: Build this BEFORE completing Home/Search if items have customizations

- [ ] Create product detail screen or modal
  - [ ] Use Expo Router dynamic route or modal presentation

- [ ] Implement UI
  - [ ] Full-size product image
  - [ ] Product name and price
  - [ ] Description
  - [ ] Back/Close button

- [ ] Implement customization options
  - [ ] Toppings section (checkboxes)
    - [ ] Multiple selection
    - [ ] Show price for each topping
    - [ ] Update total price
  - [ ] Sides section (radio buttons)
    - [ ] Single selection
    - [ ] Show price for each side
    - [ ] Update total price
  - [ ] Size selection (if applicable)

- [ ] Implement quantity selector
  - [ ] +/- buttons
  - [ ] Minimum quantity: 1
  - [ ] Update total price

- [ ] Implement "Add to Cart" button
  - [ ] Calculate final price (base + customizations × quantity)
  - [ ] Add item with customizations to cart
  - [ ] Close modal/navigate back
  - [ ] Show success feedback

### 3.4 Cart Screen (`app/(tabs)/cart.tsx`)

- [ ] Set up cart state subscription
  - [ ] Use `useCart()` hook
  - [ ] Subscribe to cart updates

- [ ] Implement cart items list
  - [ ] FlatList with `CartItem` components
  - [ ] Display all items from cart store
  - [ ] Show customizations for each item

- [ ] Implement quantity controls
  - [ ] Connect +/- buttons to cart store methods
  - [ ] `increaseQty(itemId)`
  - [ ] `decreaseQty(itemId)` (remove if qty becomes 0)

- [ ] Implement remove item
  - [ ] Swipe to delete (optional)
  - [ ] Trash icon button
  - [ ] Confirm dialog (optional)
  - [ ] Call `removeItem(itemId)`

- [ ] Implement empty cart state
  - [ ] Show EmptyState component when cart is empty
  - [ ] "Your cart is empty" message
  - [ ] "Browse Menu" button → navigate to Home

- [ ] Implement cart summary section
  - [ ] Display subtotal (sum of all items)
  - [ ] Display tax (optional, calculate percentage)
  - [ ] Display delivery fee (optional, fixed amount)
  - [ ] Display total (bold, prominent)

- [ ] Implement checkout button
  - [ ] Fixed at bottom of screen
  - [ ] Show total price on button
  - [ ] Disabled when cart is empty
  - [ ] Navigate to Order Confirmation screen

### 3.5 Order Confirmation Screen (`app/order/confirmation.tsx`)

- [ ] Create order confirmation screen
  - [ ] Accessible from Cart → Checkout button

- [ ] Display order summary
  - [ ] List all cart items (read-only)
  - [ ] Show total price

- [ ] Implement delivery/pickup options
  - [ ] Radio buttons for Delivery vs. Pickup
  - [ ] If Delivery: Show address input
  - [ ] If Pickup: Show restaurant address

- [ ] Implement payment method selection
  - [ ] Radio buttons: Cash, Credit Card, PayPal, etc.
  - [ ] If Credit Card: Show payment form (or integrate payment gateway)

- [ ] Add special instructions input (optional)
  - [ ] Text area for delivery notes

- [ ] Implement "Place Order" button
  - [ ] Validate form (address if delivery, payment method)
  - [ ] Show loading state
  - [ ] Call `createOrder()` API
  - [ ] Handle errors (payment failed, network error)
  - [ ] On success:
    - [ ] Clear cart
    - [ ] Navigate to Order Success screen

### 3.6 Order Success Screen (`app/order/success.tsx`)

- [ ] Display success animation
  - [ ] Checkmark animation (Lottie or custom)
  - [ ] "Order Placed!" message

- [ ] Display order details
  - [ ] Order number
  - [ ] Estimated delivery/pickup time
  - [ ] Total amount paid

- [ ] Add action buttons
  - [ ] "Track Order" button (if tracking feature exists)
  - [ ] "Back to Home" button → navigate to Home
  - [ ] "View Order Details" → navigate to Order Detail screen

### 3.7 Profile Screen (`app/(tabs)/profile.tsx`)

- [ ] Set up user data fetching
  - [ ] Use `useAuth()` hook to get current user
  - [ ] Fetch latest user data from API (optional)

- [ ] Implement user info section
  - [ ] Profile avatar (placeholder or image picker)
    - [ ] Tap to change avatar (use `expo-image-picker`)
  - [ ] Display name and email
  - [ ] "Edit Profile" button

- [ ] Implement profile fields (editable mode)
  - [ ] Toggle edit mode on "Edit Profile" tap
  - [ ] Use `ProfileField` components
  - [ ] Name input (editable)
  - [ ] Email display (read-only or editable)
  - [ ] Phone number input (optional)
  - [ ] Address input (optional)
  - [ ] "Save Changes" button (in edit mode)
    - [ ] Call update user API
    - [ ] Show loading state
    - [ ] Show success toast
  - [ ] "Cancel" button (exit edit mode without saving)

- [ ] Implement order history section
  - [ ] Fetch order history from API
  - [ ] List recent orders (FlatList)
  - [ ] Display for each order:
    - [ ] Order number
    - [ ] Date
    - [ ] Items count (e.g., "3 items")
    - [ ] Total price
    - [ ] Status (Completed, In Progress, Cancelled)
  - [ ] Tap to view full order details
  - [ ] Show empty state if no orders

- [ ] Implement settings section (optional)
  - [ ] Push notifications toggle
  - [ ] Email notifications toggle
  - [ ] Dark mode toggle (if implementing dark mode)

- [ ] Implement logout functionality
  - [ ] "Logout" button (prominent, at bottom)
  - [ ] Confirm logout dialog
    - [ ] "Are you sure you want to logout?"
    - [ ] Cancel / Logout buttons
  - [ ] On confirm:
    - [ ] Call `signOut()` from auth store
    - [ ] Clear auth token from SecureStore
    - [ ] Clear cart (optional)
    - [ ] Navigate to `/(auth)/sign-in`

### 3.8 Order Detail Screen (`app/order/[id].tsx`)

- [ ] Create order detail screen
  - [ ] Accessible from Profile → Order History
  - [ ] Use Expo Router dynamic route

- [ ] Fetch order details
  - [ ] Use order ID from route params
  - [ ] Call `getOrderById(id)` API
  - [ ] Handle loading and error states

- [ ] Display order information
  - [ ] Order number and date
  - [ ] Order status (with colored badge)
  - [ ] Estimated delivery time

- [ ] Display ordered items
  - [ ] List all items with quantities
  - [ ] Show customizations
  - [ ] Show individual prices and subtotals

- [ ] Display order summary
  - [ ] Subtotal
  - [ ] Tax
  - [ ] Delivery fee
  - [ ] Total paid

- [ ] Display delivery information
  - [ ] Delivery address (if delivery)
  - [ ] Pickup location (if pickup)
  - [ ] Special instructions

- [ ] Add action buttons (based on status)
  - [ ] "Track Order" (if in progress)
  - [ ] "Reorder" → add all items to cart
  - [ ] "Cancel Order" (if within cancellation window)
  - [ ] "Get Help" → contact support

---

## Phase 4: Polish & Optimization

**Goal**: Make the app production-ready

### 4.1 Error Handling & User Feedback

- [ ] Implement global error boundary
  - [ ] Create `components/ErrorBoundary.tsx`
  - [ ] Wrap app in `_layout.tsx`
  - [ ] Fallback UI with error message and "Retry" button
  - [ ] Log errors to monitoring service (Sentry, optional)

- [ ] Implement screen-level error boundaries
  - [ ] Wrap each screen's content
  - [ ] Screen-specific error messages

- [ ] Add toast notifications
  - [ ] Configure `react-native-toast-message`
  - [ ] Add Toast component to root layout
  - [ ] Success toasts (item added, order placed, profile updated)
  - [ ] Error toasts (API failures, validation errors)
  - [ ] Info toasts (no internet, loading delays)

- [ ] Implement loading states
  - [ ] Loading skeletons for content (use `LoadingSkeleton` component)
  - [ ] Full-screen loading for critical operations
  - [ ] Button loading states (disable + spinner)
  - [ ] Pull-to-refresh loading

- [ ] Handle offline scenarios
  - [ ] Install `@react-native-community/netinfo`
  - [ ] Detect network status
  - [ ] Show offline banner at top of screen
  - [ ] Queue API requests for when online (optional)
  - [ ] Cache data for offline viewing (optional)

- [ ] Add confirmation dialogs
  - [ ] Logout confirmation
  - [ ] Delete item confirmation
  - [ ] Cancel order confirmation
  - [ ] Use `react-native-alert` or custom modal

### 4.2 Testing

- [ ] Set up testing infrastructure
  - [ ] Install Jest (included with Expo)
  - [ ] Install `@testing-library/react-native`
  - [ ] Configure test scripts in `package.json`

- [ ] Write unit tests
  - [ ] Test utility functions (formatters, validators)
  - [ ] Test API service functions (mock fetch)
  - [ ] Test cart calculations (totals, quantities)
  - [ ] Test state management (store actions)

- [ ] Write component tests
  - [ ] Test CustomButton (press events, loading state)
  - [ ] Test CustomInput (value changes, validation)
  - [ ] Test MenuCard (display data, press events)
  - [ ] Test CartItem (quantity controls, remove)
  - [ ] Test form validation

- [ ] Write integration tests (optional)
  - [ ] Test user flows (sign-in → browse → add to cart → checkout)
  - [ ] Test navigation between screens

- [ ] E2E tests with Detox (optional)
  - [ ] Install and configure Detox
  - [ ] Test authentication flow
  - [ ] Test add to cart flow
  - [ ] Test checkout flow

- [ ] Manual testing checklist
  - [ ] Test on both iOS and Android
  - [ ] Test on different screen sizes
  - [ ] Test with slow network (throttle in dev tools)
  - [ ] Test offline behavior
  - [ ] Test with empty states
  - [ ] Test error scenarios

### 4.3 Performance Optimization

- [ ] Optimize images
  - [ ] Use Expo Image component (already in dependencies)
  - [ ] Enable image caching
  - [ ] Use appropriate image sizes (don't use huge images)
  - [ ] Lazy load images (fade-in on load)
  - [ ] Consider WebP format for smaller sizes

- [ ] Optimize lists
  - [ ] Ensure FlatList is used for long lists (not ScrollView + map)
  - [ ] Add `keyExtractor` prop
  - [ ] Set `removeClippedSubviews={true}` (Android)
  - [ ] Use `getItemLayout` if items have fixed height
  - [ ] Implement pagination for very long lists
  - [ ] Use `initialNumToRender` to control initial batch

- [ ] Optimize component rendering
  - [ ] Use `React.memo()` for components that receive same props often
  - [ ] Use `useMemo()` for expensive calculations
  - [ ] Use `useCallback()` for functions passed as props
  - [ ] Avoid inline function definitions in render
  - [ ] Avoid anonymous objects/arrays as props

- [ ] Code splitting (optional)
  - [ ] Lazy load screens with `React.lazy()` (limited support in RN)
  - [ ] Dynamic imports for heavy libraries
  - [ ] Split by route using Expo Router code splitting

- [ ] Monitor performance
  - [ ] Use React DevTools Profiler
  - [ ] Use Flipper for React Native debugging
  - [ ] Monitor bundle size
  - [ ] Check for memory leaks

### 4.4 Accessibility & UX Enhancements

- [ ] Add accessibility labels
  - [ ] Add `accessibilityLabel` to all interactive elements
  - [ ] Add `accessibilityHint` for complex interactions
  - [ ] Add `accessibilityRole` (button, header, link, etc.)
  - [ ] Test with iOS VoiceOver
  - [ ] Test with Android TalkBack

- [ ] Implement haptic feedback
  - [ ] Use `expo-haptics` (already in dependencies)
  - [ ] Add light impact on button presses
  - [ ] Add notification feedback on success/error
  - [ ] Add impact feedback on add to cart

- [ ] Add smooth animations
  - [ ] Use React Native Reanimated (already in dependencies)
  - [ ] Animate screen transitions
  - [ ] Animate cart badge count changes
  - [ ] Animate menu item appearance (fade in, slide up)
  - [ ] Animate category filter selection
  - [ ] Animate loading states (skeleton shimmer)
  - [ ] Animate success checkmark (order placed)

- [ ] Improve form UX
  - [ ] Auto-focus first input on screen mount
  - [ ] Move to next input on "Return" key
  - [ ] Show password visibility toggle
  - [ ] Clear input button (X icon)
  - [ ] Inline validation messages
  - [ ] Disable submit button until form is valid

- [ ] Add dark mode support (optional)
  - [ ] Define dark color scheme in Tailwind config
  - [ ] Use `useColorScheme()` hook to detect system theme
  - [ ] Add manual theme toggle in Profile settings
  - [ ] Update all components to use theme-aware colors
  - [ ] Test all screens in dark mode

- [ ] Polish UI details
  - [ ] Add subtle shadows and elevation
  - [ ] Smooth border radius on cards
  - [ ] Consistent spacing throughout app
  - [ ] Loading states for all async operations
  - [ ] Proper keyboard avoidance (KeyboardAvoidingView)
  - [ ] Pull-to-refresh on all list screens

---

## Recommended Daily Workflow

1. **Start of day**
   - Pull latest changes (if team environment)
   - Review DEVELOPMENT_FLOW.md and identify next task
   - Review any blockers from previous session

2. **Pick ONE feature/screen** to implement
   - Don't try to do multiple screens at once
   - Finish one complete feature before moving to next

3. **Follow this development pattern:**
   ```
   a. Plan → Review design, define TypeScript interfaces
   b. API → Create/update service methods if needed
   c. Components → Build any new reusable components
   d. Screen → Implement the screen using components
   e. Test → Test on both iOS and Android simulators
   f. Refine → Fix bugs, improve UX
   g. Commit → Make clear, focused commit
   ```

4. **Testing routine**
   - Test on iOS simulator
   - Test on Android simulator (or vice versa)
   - Test edge cases (empty states, errors, offline)
   - Test on different screen sizes (if applicable)

5. **Run build checks periodically**
   - `npx expo start` - Ensure no build errors
   - `npm run lint` - Check for linting errors (if configured)
   - `npm test` - Run unit tests (once implemented)

6. **End of day**
   - Review and refactor code if needed
   - Update this DEVELOPMENT_FLOW.md (check off completed items)
   - Commit any remaining work
   - Document any blockers or questions

---

## Development Principles

### ✅ DO:

- **Build incrementally**: One feature completely before starting the next
- **Test frequently**: On both iOS and Android simulators regularly
- **Follow patterns**: Use existing code patterns (NativeWind classes, TypeScript types)
- **Type everything**: Don't skip TypeScript types - they catch bugs early
- **Handle edge cases**: Empty states, loading states, error states
- **Keep components small**: Single responsibility, reusable, well-named
- **Commit often**: Small, focused commits with clear messages
- **Ask questions**: If unclear, ask before implementing
- **Review your code**: Before committing, review your own changes

### ❌ DON'T:

- **Large-scale refactoring**: Per CLAUDE.md guidelines - make focused changes only
- **Build UI before API is ready**: Ensure backend endpoints exist or are mocked
- **Skip TypeScript**: Defeats the purpose of using TypeScript
- **Hardcode values**: Use environment variables for API URLs, secrets
- **Ignore errors**: Always handle and display errors gracefully
- **Commit broken code**: Ensure code builds before committing
- **Duplicate code**: Extract reusable logic into utilities/components
- **Over-engineer**: Build what's needed now, not what might be needed
- **Skip testing**: At minimum, manually test your changes thoroughly

---

## Next Immediate Steps (Recommended Order)

**Start here** if beginning Phase 1:

1. [ ] Install dependencies (`expo-secure-store`, `zustand`, `react-native-toast-message`) (~10 min)
2. [ ] Set up environment variables (`.env` file with API URL) (~15 min)
3. [ ] Create utility functions (formatters, validators) (~30 min)
4. [ ] Set up Zustand cart store (~45 min)
5. [ ] Create API service layer (base client + auth service) (~1.5 hours)
6. [ ] Create auth store/context with token persistence (~1 hour)
7. [ ] Wire up sign-in/sign-up screens to backend (~1 hour)
8. [ ] Fix authentication guard in tabs layout (~15 min)
9. [ ] Implement tab bar navigation (~30 min)
10. [ ] Build reusable components (MenuCard, CartItem, etc.) (~2 hours)

**Estimated time to complete Phase 1**: 8-10 hours of focused work

---

## Notes & Decisions

### State Management Decision
- **Decision**: [TBD - Zustand vs Context API]
- **Reason**:
- **Date decided**:

### API Base URL
- **Development**: `http://localhost:8080/api` or `http://192.168.x.x:8080/api` (use local IP for testing on device)
- **Staging**: [TBD]
- **Production**: [TBD]

### Environment Variables
- [ ] Set up `.env` file
- [ ] Add `EXPO_PUBLIC_API_URL`
- [ ] Add `EXPO_PUBLIC_API_TIMEOUT` (optional, default 10000ms)
- [ ] Add other environment-specific configs as needed

### Design Decisions
- **Color scheme**: Orange primary (#FE8C00), defined in tailwind.config.js
- **Font family**: Quicksand (Regular, Bold, SemiBold, Medium)
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (Tailwind CSS for React Native)

### Third-Party Services (Optional)
- **Analytics**: [TBD - Firebase, Mixpanel, Amplitude]
- **Error tracking**: [TBD - Sentry, Bugsnag]
- **Push notifications**: [TBD - Firebase, OneSignal]
- **Payment gateway**: [TBD - Stripe, PayPal]

---

## Blockers & Issues

### Current Blockers
- None

### Resolved Issues
- None yet

**How to use this section:**
- Add blockers as they arise (e.g., "Backend API not ready", "Unclear design for X feature")
- Move to "Resolved" once fixed, with resolution notes
- Review blockers at start of each day

---

## Sprint/Milestone Planning (Optional)

Use this section to set deadlines and track progress across phases.

### Sprint 1: Foundation (Target: [DATE])
**Goal**: Complete infrastructure setup
- [ ] Complete Phase 1 (Foundation)
  - [x] Phase 0 already complete
  - [ ] Environment setup
  - [ ] API service layer
  - [ ] State management
  - [ ] Authentication flow
- [ ] Complete Phase 2.1 (Tab Bar Navigation)

**Estimated effort**: 10-12 hours

---

### Sprint 2: Core UI & Components (Target: [DATE])
**Goal**: Build reusable components and basic screens
- [ ] Complete Phase 2.2 (Common UI Components)
- [ ] Complete Phase 3.1 (Home Screen)
- [ ] Complete Phase 3.3 (Product Detail Screen)

**Estimated effort**: 12-15 hours

---

### Sprint 3: Shopping Flow (Target: [DATE])
**Goal**: Complete end-to-end shopping experience
- [ ] Complete Phase 3.2 (Search Screen)
- [ ] Complete Phase 3.4 (Cart Screen)
- [ ] Complete Phase 3.5 (Order Confirmation)
- [ ] Complete Phase 3.6 (Order Success)

**Estimated effort**: 10-12 hours

---

### Sprint 4: User Features (Target: [DATE])
**Goal**: Profile and order management
- [ ] Complete Phase 3.7 (Profile Screen)
- [ ] Complete Phase 3.8 (Order Detail Screen)

**Estimated effort**: 8-10 hours

---

### Sprint 5: Polish & Launch (Target: [DATE])
**Goal**: Production-ready quality
- [ ] Complete Phase 4.1 (Error Handling & Feedback)
- [ ] Complete Phase 4.2 (Testing)
- [ ] Complete Phase 4.3 (Performance Optimization)
- [ ] Complete Phase 4.4 (Accessibility & UX)
- [ ] Final QA and bug fixes
- [ ] Prepare for production deployment

**Estimated effort**: 15-20 hours

---

## Total Estimated Time
**Full project completion**: 55-69 hours of focused development work

**This translates to:**
- Full-time (8 hrs/day): 7-9 days
- Part-time (4 hrs/day): 14-18 days
- Casual (2 hrs/day): 28-35 days

*Note: Estimates are for reference only. Actual time may vary based on experience level, complexity additions, and unforeseen issues.*

---

## Tracking Progress

**How to use this document:**

1. **Daily**: Check off completed items `[x]` as you finish them
2. **Weekly**: Update "Current Status" section at top
3. **Per Sprint**: Review sprint goals and adjust deadlines if needed
4. **Continuous**: Add notes, decisions, and blockers as they arise

**Color coding in your IDE** (optional):
- ✅ Green: Completed
- ⚠️ Yellow: In progress
- ❌ Red: Blocked or not started

---

**Remember**:

> "Progress over perfection. Build incrementally, test frequently, commit often."

Focus on completing one feature at a time to its full quality, rather than rushing through multiple half-finished features. The compound effect of daily progress will get you to a production-ready app.

**Good luck building! 🚀**