# fanfeedr

Node.js API client for FanFeedr platform.

API reference can be found here: http://developer.fanfeedr.com/docs/read/Welcome_to_the_FanFeedr_Sports_API

Currently 100% of the API are implemented in Node.js.

In API we use standard Node.js convention: callback of each API call is the last function parameter. Callback takes two
parameters: error and data. One parameter should be always undefined.


Also please note that we changed some naming: so leagues became sport and conferences -> leagues.

# TO-DO

Add more tests.


## License

(The MIT License)

Copyright (c) 2011 Enginimation Studio (http://enginimation.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
