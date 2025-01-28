vanilla reactJS is too much of a hassle to make work with react-native skia and reanimated

says here

- https://github.com/software-mansion/react-native-reanimated/issues/4335

Suggestion:

1. build for react native + react native web. Then:

- Iframe into the webApp with some restricted params, can potentially utilize postmessage to communicate between the two
- see if we can export it as a web component and use it in the webApp (hard)

2. Build for Web and Webview into react native apps

- use postmessage for communication between the two
