# js-library-zhan8118
- A link to landing page: https://quiet-bastion-19532.herokuapp.com/
- A link to documentation: https://quiet-bastion-19532.herokuapp.com/documentation.html
- Getting Started section 
<h1 class="colorfor gradientText">Getting Started</h1>
        <h3>Let's get started using Colorfor.js!</h3>
        <h3>First, we need to include Colorfor.js in our page</h3>
        <div class="colorfor base1" style="padding: 20px;height: 40px;"> 
            <div class="codeblock">
             <pre>
                &lt;script src='js/colorfor.js'&gt;&lt;/script&gt;
            </pre>   
            </div>  
        </div> 
        <h3>Now, we need to create element which we want to use the library.</h3>
        <div class="colorfor base1" style="padding: 20px;height: 200px;"> 
            <div class="codeblock">
             <pre>
                <span class="codeComment">//add colorfor to the class of the element to let the lib know which element you want to use lib</span>
                <span class="codeComment">//The second class should be the base/main/accent if this element is supposed to be painted color</span>
                &lt;body class=&quot;colorfor base&quot;&gt;
                &lt;div class=&quot;colorfor main gradient animation&quot; &gt; &lt;/div&gt;
                &lt;img class=&quot;colorfor gradientPic&quot; src=&quot;img/bannerbanner.jpg&quot; /&gt;
                &lt;div class=&quot;colorfor accent1&quot;&gt; &lt;/div&gt;
                &lt;div class=&quot;colorfor main&quot; &gt;&lt;/div&gt;
                &lt;div class=&quot;colorfor main&quot; &gt;&lt;/div&gt;
                &lt;button class=&quot;colorfor gradientButton&quot; &gt;Back&lt;/button&gt;
                &lt;/body&gt;
            </pre>   
            </div>  
        </div> 
        <h3>Now, we can create a Colorfor object in the js file which manipulates the dom.</h3>
        <div class="colorfor base1" style="padding: 20px;"> 
            <div class="codeblock">
             <pre><span class="codeComment">//JS </span>
                    var myColorforInstance = new Colorfor({
                        elementClass: '.colorfor',
                        states : {
                            "color": {
                                themePic:{              <span class="codeComment">//must set the themePic to let lib know you choose to use the color produced by target image</span>
                                    gradients: {
                                        direction:'45deg'
                                    },
                                    animation:{
                                        time: 2,              
                                    },
                                    selection:{
                                        selectionColor:"accent"
                                    }             
                                }
                    
                            }
                        }
                        });
</pre>   
            </div>  
        </div>

