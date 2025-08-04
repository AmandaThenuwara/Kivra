// Test Card Numbers for Payment Gateway

## How to Test the Manual Card Type Selection

### Step-by-Step Testing:

1. **First, select the card type** from the dropdown:
   - Visa
   - Mastercard  
   - American Express
   - Discover

2. **Then enter the corresponding card number** (any of the test numbers below)

3. **Notice the CVV field** becomes enabled and shows correct length requirement

## Valid Test Card Numbers

### Visa Cards (Select "Visa" first)
- 4111 1111 1111 1111 (Basic Visa)
- 4000 0000 0000 0002 (Visa)
- 4242 4242 4242 4242 (Visa)

### Mastercard (Select "Mastercard" first)
- 5555 5555 5555 4444 (Basic Mastercard)
- 5200 0000 0000 1005 (Mastercard)
- 2223 0031 2200 3222 (Mastercard 2-series)

### American Express (Select "American Express" first)
- 3782 822463 10005 (Basic Amex)
- 3714 496353 98431 (Amex)
- 3787 344936 71000 (Amex)

### Discover (Select "Discover" first)
- 6011 1111 1111 1117 (Basic Discover)
- 6011 0009 9013 9424 (Discover)

## Important Changes Made:

### ✅ **Manual Card Type Selection**
- Users must select card type from dropdown first
- No automatic detection based on card number
- CVV field is disabled until card type is selected

### ✅ **Dynamic CVV Validation**
- Shows "Select card type first" until type is chosen
- 3 digits for Visa, Mastercard, Discover
- 4 digits for American Express
- Help text updates based on selection

### ✅ **Enhanced Validation**
- Card type is now required
- CVV validation depends on selected card type
- Clear error messages for missing selections

## Test Data for Forms

### Card Types to Select
- 💳 Visa
- 💳 Mastercard  
- 💳 American Express
- 💳 Discover

### Cardholder Names
- John Doe
- Jane Smith
- Test User

### Expiry Dates (Use future dates)
- 12/25, 01/26, 06/27, etc.

### CVV Codes
- 123 (for Visa, Mastercard, Discover)
- 1234 (for American Express)

## New User Flow

1. **Select Card Type** ⚠️ REQUIRED FIRST
2. Enter Card Number (auto-formatted)
3. Enter Expiry Date (MM/YY format)
4. Enter CVV (length depends on card type)
5. Enter Cardholder Name
6. Complete billing address

The payment gateway now requires users to explicitly choose their card type, giving them full control over the payment process.
