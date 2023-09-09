# Routes LIST

ROLES
0 - user
1- seller + user

## Default Route - /api

## Cateogires routes

<!-- - /addFilter
- /getFilter/:filterName
- /getAllFilters -->

## User routes

<!-- - /user/auth/signIn
- /user/auth/signUp -- isSeller:false -->

- /user/:userId/orders

## Paintings

<!--
- /uploadPainting
- /getPaintingImage?filename=fileName
- /getPaintingDetails/:paintingId -->

## Seller routes

<!-- - /user/auth/signIn
- /user/auth/signUp -- isSeller:true -->

- /user/:userId/profile
- /user/deleteArt/:paitingId
- /user/:userId/orders
- /recivedOrders

## Product Routes

<!-- - /art/getAllArts
- /seller/:sellerId/getArts
- /art/artDetails/:artId -->

## Orders Routes

- /user/:userId/myOrders
- /user/order/:orderId
- /placeorder

## Payment Routes

- This routes will be coming after RazorPay integration
