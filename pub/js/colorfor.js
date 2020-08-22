'use strict';

(function(global) {
const log = console.log
function Colorfor(options) {
    this.getElements(options.elementClass)
    this.states = options.states;  
    if (this.states.color.hasOwnProperty('themePic')){       
        this.findThemePicColor(this.states.color)
        this.setGlowingBorder(this.states.color)
    } else if (this.states.color.hasOwnProperty('randomColor')){
        this.randomColors(this.states.color)
        this.setGlowingBorder(this.states.color)
    }else {
        this.setColor(this.states.color)
        this.setTextColor(this.states.color)
        this.setAnimatedText(this.states.color,Object.values(ColorScheme[this.states.color.theme][this.states.color.type]))
        this.setGradientPic(this.states.color)
        this.setGradientButton(this.states.color)
        this.setGlowingBorder(this.states.color)
        if (this.states.color.hasOwnProperty('selection')){
            this.setSelectionColor(this.states.color)

        }
        if (this.states.color.hasOwnProperty('colorforDecoration')){
            this.setColorforDecoration(this.states.color, Object.values(ColorScheme[this.states.color.theme][this.states.color.type]))
        }
        
    }
   
   

}



Colorfor.prototype.getElements = function(elementClass) {
    if (typeof elementClass === 'string'){
        this.targetElements = document.querySelectorAll(elementClass);
    } else {
		throw new Error('The element you used is not a string');
	}
	if (!this.targetElements) {
		throw new Error('`' + element + '` could not be found in the DOM');
	}
};

Colorfor.prototype.setColor =  function(color) {
    if (typeof color === 'object') {
        const elements = Array.from(this.targetElements)
        if (ColorScheme.hasOwnProperty(color.theme)){
            
            elements.map((element)=>{
                element.style.backgroundColor= ColorScheme[color.theme][color.type][element.classList.item(1)]
            })          
        }  
        if(color.hasOwnProperty("gradients")){
            const grads = [ColorScheme[color.theme][color.type]['base'], ColorScheme[color.theme][color.type]['main'], ColorScheme[color.theme][color.type]['accent']]
            this.setGradients(elements,grads, color.gradients.direction)
            if(color.hasOwnProperty("animation")){
                const animationGrads = Object.values(ColorScheme[color.theme][color.type])
                this.setGradients(elements,animationGrads, color.gradients.direction)
                this.setGradientsAnimation(elements, color.animation.time)
            }
            


        }      
    }else {
        throw new Error('The color you set not exits')
    }
}



Colorfor.prototype.setGradients = function(elements,gradients,direction){
    const gradientElements=elements.filter((element)=>element.classList.contains("gradient"))
    gradientElements.map((gradientElement)=>{
        gradientElement.style.backgroundImage=`linear-gradient(${direction}, ${gradients})`
    })
}

Colorfor.prototype.setGradientsAnimation = function(elements,time){
    
    const animationElements = elements.filter((element)=>element.classList.contains("animation"))

    const operateElements=animationElements.map((animationElement) => {animationElement.style.backgroundSize="400% 400%"})
    animationElements.forEach(element => {
        element.animate([
            // keyframes
            
            { backgroundPosition: '0% 50%' },
            { backgroundPosition: '100% 50%' },
            { backgroundPosition: '0% 50%' }

          ], { 
            // timing options
            duration: time*1000,
            iterations: Infinity,
            // direction: "alternate-reverse",
            easing: 'ease'
          });
    });
 
}

Colorfor.prototype.setTextColor =  function(color) {
    if (typeof color === 'object') {
        const elements = Array.from(this.targetElements)
        const textElements =elements.filter((element)=>element.classList.contains("gradientText"))
        if(color.hasOwnProperty("gradients")){
            const grads = [ColorScheme[color.theme][color.type]['base'], ColorScheme[color.theme][color.type]['main'], ColorScheme[color.theme][color.type]['accent']]
            // this.setGradients(elements,grads, color.gradients.direction)
            textElements.forEach(gradientElement =>{
                gradientElement.style.backgroundImage=`linear-gradient(${color.gradients.direction}, ${grads})`
                gradientElement.style.backgroundClip="text"
                gradientElement.style.WebkitBackgroundClip="text"
                gradientElement.style.color="transparent"

            })
            if(color.hasOwnProperty("animation")){
                textElements.forEach(textElement => {
                    textElement.style.backgroundSize="400%"
                    textElement.animate([
                        // keyframes
                        { backgroundPosition: 'left' }, 
                        { backgroundPosition: 'right' },           
                      ], { 
                        // timing options
                        duration: color.animation.time*1000,
                        iterations: Infinity,
                        direction: "alternate",
                      });

                })
            }
            


        }      
    }else {
        throw new Error('The color you set not exits')
    }
}
Colorfor.prototype.setAnimatedText =  function(color, colors) {
    if (typeof color === 'object') {
        const elements = Array.from(this.targetElements)
        const textElements =elements.filter((element)=>element.classList.contains("animatedText"))
        if(color.hasOwnProperty("gradients")){
            // const grads = [ColorScheme[color.theme][color.type]['base'], ColorScheme[color.theme][color.type]['main'], ColorScheme[color.theme][color.type]['accent']]
            // this.setGradients(elements,grads, color.gradients.direction)
            if(textElements.length>0){
                textElements.forEach(gradientElement =>{
                gradientElement.style.position="relative"
                gradientElement.style.color="transparent"
                gradientElement.whiteSpace="nowrap"

                var sheet = window.document.styleSheets[0];
                sheet.addRule('.animatedText:before','content: attr(data-text);');
                sheet.addRule('.animatedText:before','position: absolute;');
                sheet.addRule('.animatedText:before','top: 0px;');
                sheet.addRule('.animatedText:before','left: 0px;');
                sheet.addRule('.animatedText:before','width: 100%;');
                sheet.addRule('.animatedText:before','height: 100%;');
               
                sheet.addRule('.animatedText:before','white-space: nowrap;');
                sheet.addRule('.animatedText:before','overflow: hidden;');
                sheet.addRule('.animatedText:before','color: transparent;');
                sheet.addRule('.animatedText:before','background: linear-gradient(to right'+","+ colors[0]+","+colors[1]+","+colors[2]+","+colors[3]+","+colors[4]+","+colors[3]+","+colors[2]+","+colors[1]+","+ colors[0]+");");
                sheet.addRule('.animatedText:before','-webkit-background-clip: text;');
                sheet.addRule('.animatedText:before','animation: type 20s linear;');
                sheet.addRule('.animatedText:before','filter: blur(1px);');

    
                sheet.addRule('.animatedText:after','content: attr(data-text);');
                sheet.addRule('.animatedText:after','position: absolute;');
                sheet.addRule('.animatedText:after','top: 0px;');
                sheet.addRule('.animatedText:after','left: 0px;');
                sheet.addRule('.animatedText:after','width: 100%;');
                sheet.addRule('.animatedText:after','height: 100%;');
              
                sheet.addRule('.animatedText:after','white-space: nowrap;');
                sheet.addRule('.animatedText:after','overflow: hidden;');
                sheet.addRule('.animatedText:after','color: transparent;');
                sheet.addRule('.animatedText:after','background: linear-gradient(to right'+","+ colors[0]+","+colors[1]+","+colors[2]+","+colors[3]+","+colors[4]+","+colors[3]+","+colors[2]+","+colors[1]+","+ colors[0]+");");
                sheet.addRule('.animatedText:after','-webkit-background-clip: text;');
                sheet.addRule('.animatedText:after','animation: type 20s linear;');
                sheet.addRule('.animatedText:after','filter: blur(20px);');

                var cssKeyframe = document.createElement('style');
                cssKeyframe.type = 'text/css';
                var rules = document.createTextNode('@-webkit-keyframes type {'+
                '0% { width: 0%; }'+
                '70% { width: 100%; }'+
                '90% { width: 100%; }'+
                '100% { width: 100%; }'+
                '}');
                cssKeyframe.appendChild(rules);
                document.getElementsByTagName("head")[0].appendChild(cssKeyframe);
                

            })
            }
            


        }      
    }else {
        throw new Error('The color you set not exits')
    }
}

Colorfor.prototype.setGradientPic = function(color) {
    if (typeof color === 'object') {
        const elements = Array.from(this.targetElements)
        const gradientPicElements =elements.filter((element)=>element.classList.contains("gradientPic"))
        if(color.hasOwnProperty("gradientPic")){
            gradientPicElements.forEach(gradientPicElement => gradientPicElement.style.mixBlendMode=color.gradientPic.blendingMode)      
        }     
    }else {
        throw new Error('The color you set not exits')
    }
}//User has to put the pic inside a colorfor element with gradient/animation color

Colorfor.prototype.setGradientButton =  function(color) {
    if (typeof color === 'object') {
        const elements = Array.from(this.targetElements)
        const gradientButtonElements =elements.filter((element)=>element.classList.contains("gradientButton"))
        if(color.hasOwnProperty("gradients")){
            const grads = [ColorScheme[color.theme][color.type]['accent'],ColorScheme[color.theme][color.type]['main'], ColorScheme[color.theme][color.type]['accent1']]
            // const grads = Object.values(ColorScheme[color.theme][color.type])
            // this.setGradients(elements,grads, color.gradients.direction)
            gradientButtonElements.forEach(gradientButtonElement =>{
                gradientButtonElement.style.backgroundImage=`linear-gradient(${color.gradients.direction}, ${grads})`
                gradientButtonElement.style.backgroundSize="200% "  
                gradientButtonElement.style.backgroundPosition="left"
                gradientButtonElement.style.transition="background-position 0.75s"              
                gradientButtonElement.onmouseover=function(){this.style.backgroundPosition="right"}
                gradientButtonElement.onmouseout=function(){this.style.backgroundPosition="left"}

            })
           
        }      
    }else {
        throw new Error('The color you set not exits')
    }
}

Colorfor.prototype.setSelectionColor = function(color) {
    if (typeof color === 'object') {
        var sheet = window.document.styleSheets[0];
        sheet.insertRule(`::selection {background: ${ColorScheme[color.theme][color.type][color.selection.selectionColor]}; color: black;}`, sheet.cssRules.length);
    }else {
        throw new Error('The color format you is not correct')
    }
}

Colorfor.prototype.findThemePicColor = function(color) {
    const colorToPass = color
    const elements = Array.from(this.targetElements)
    const themePicElement = elements.filter((targetElement) => targetElement.classList.contains('themePic'))
    const setColorforDecoration = this.setColorforDecoration
    const setAnimatedText = this.setAnimatedText
    var paintThemeColor = this.paintThemeColor
    // let colorsToUse = []
    if (themePicElement.length > 0){
        const source = themePicElement[0].src
        
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = function() {
            var img = document.createElement('img');
            img.setAttribute('src', source)
            img.addEventListener('load', function() {
            var vibrant = new Vibrant(img, 64, 6);   //Use external library Vibrant.js to extract color from the themePic 
            var swatches = vibrant.swatches()
            const themeColors=[]
            
           
            for (var swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                    var colorInfo ={}
                    colorInfo['Hex'] = swatches[swatch].getHex()
                    colorInfo['RGB'] = swatches[swatch].getRgb(),
                    colorInfo['Yvalue'] = 0.299*swatches[swatch].getRgb()[0]+0.587*swatches[swatch].getRgb()[1]+0.114*swatches[swatch].getRgb()[2]
                    themeColors[themeColors.length]=colorInfo
                    
                }
                
                themeColors.sort((a, b) => b.Yvalue- a.Yvalue)  
                paintThemeColor(colorToPass, elements, themeColors, setColorforDecoration, setAnimatedText)
                
                
        });

        }
        script.src = 'js/Vibrant.js';
        head.appendChild(script);
        
       
    }   
    
}



Colorfor.prototype.paintThemeColor= function(color,elements,themeColors, setColorforDecoration) {
       
       if (themeColors.length === 5) {
       const themePicColor = {
           base: themeColors[0]['Hex'],
           main: themeColors[1]['Hex'],
           main1: themeColors[2]['Hex'],
           accent: themeColors[3]['Hex'],
           accent1:themeColors[4]['Hex'],
       }
       const colorArray =[]
       colorArray.push(themeColors[0]['Hex'])
       colorArray.push(themeColors[1]['Hex'])
       colorArray.push(themeColors[2]['Hex'])
       colorArray.push(themeColors[3]['Hex'])
       colorArray.push(themeColors[4]['Hex'])
       
       ColorScheme['themePicColor'] = themePicColor
       
        if (ColorScheme.hasOwnProperty('themePicColor')){
            
            elements.map((element)=>{
                element.style.backgroundColor= ColorScheme['themePicColor'][element.classList.item(1)]
            })          
        }  
        if (color.hasOwnProperty('colorforDecoration')){
            
            setColorforDecoration(color, colorArray)
        }
        if(color.hasOwnProperty("themePic")){
            if(color.themePic.hasOwnProperty("gradients")){
            const grads = Object.values(ColorScheme['themePicColor'])

            const gradientElements=elements.filter((element)=>element.classList.contains("gradient"))
            gradientElements.map((gradientElement)=>{
                gradientElement.style.backgroundImage=`linear-gradient(${color.themePic.gradients.direction}, ${grads})`
            })
            //set text color
            const textElements =elements.filter((element)=>element.classList.contains("gradientText"))
            const textgrads = [ColorScheme['themePicColor']['base'], ColorScheme['themePicColor']['main'], ColorScheme['themePicColor']['accent']]
                textElements.forEach(gradientElement =>{
                    gradientElement.style.backgroundImage=`linear-gradient(${color.themePic.gradients.direction}, ${textgrads})`
                    gradientElement.style.backgroundClip="text"
                    gradientElement.style.WebkitBackgroundClip="text"
                    gradientElement.style.color="transparent"
    
                })
                const animatedElements =elements.filter((element)=>element.classList.contains("animatedText"))
                if(animatedElements.length>0){
                    animatedElements.forEach(animatedElement =>{
                    animatedElement.style.position="relative"
                    animatedElement.style.color="transparent"
                    animatedElement.whiteSpace="nowrap"
    
                    var sheet = window.document.styleSheets[0];
                    sheet.addRule('.animatedText:before','content: attr(data-text);');
                    sheet.addRule('.animatedText:before','position: absolute;');
                    sheet.addRule('.animatedText:before','top: 0px;');
                    sheet.addRule('.animatedText:before','left: 0px;');
                    sheet.addRule('.animatedText:before','width: 100%;');
                    sheet.addRule('.animatedText:before','height: 100%;');
                   
                    sheet.addRule('.animatedText:before','white-space: nowrap;');
                    sheet.addRule('.animatedText:before','overflow: hidden;');
                    sheet.addRule('.animatedText:before','color: transparent;');
                    sheet.addRule('.animatedText:before','background: linear-gradient(to right'+","+ colorArray[0]+","+colorArray[1]+","+colorArray[2]+","+colorArray[3]+","+colorArray[4]+","+colorArray[3]+","+colorArray[2]+","+colorArray[1]+","+ colorArray[0]+");");
                    sheet.addRule('.animatedText:before','-webkit-background-clip: text;');
                    sheet.addRule('.animatedText:before','animation: type 20s linear;');
                    sheet.addRule('.animatedText:before','filter: blur(1px);');
    
        
                    sheet.addRule('.animatedText:after','content: attr(data-text);');
                    sheet.addRule('.animatedText:after','position: absolute;');
                    sheet.addRule('.animatedText:after','top: 0px;');
                    sheet.addRule('.animatedText:after','left: 0px;');
                    sheet.addRule('.animatedText:after','width: 100%;');
                    sheet.addRule('.animatedText:after','height: 100%;');
                  
                    sheet.addRule('.animatedText:after','white-space: nowrap;');
                    sheet.addRule('.animatedText:after','overflow: hidden;');
                    sheet.addRule('.animatedText:after','color: transparent;');
                    sheet.addRule('.animatedText:after','background: linear-gradient(to right'+","+ colorArray[0]+","+colorArray[1]+","+colorArray[2]+","+colorArray[3]+","+colorArray[4]+","+colorArray[3]+","+colorArray[2]+","+colorArray[1]+","+ colorArray[0]+");");
                    sheet.addRule('.animatedText:after','-webkit-background-clip: text;');
                    sheet.addRule('.animatedText:after','animation: type 20s linear;');
                    sheet.addRule('.animatedText:after','filter: blur(20px);');
    
                    var cssKeyframe = document.createElement('style');
                    cssKeyframe.type = 'text/css';
                    var rules = document.createTextNode('@-webkit-keyframes type {'+
                    '0% { width: 0%; }'+
                    '70% { width: 100%; }'+
                    '90% { width: 100%; }'+
                    '100% { width: 100%; }'+
                    '}');
                    cssKeyframe.appendChild(rules);
                    document.getElementsByTagName("head")[0].appendChild(cssKeyframe);
                    
    
                })
                }
                if(color.themePic.hasOwnProperty("animation")){
                    textElements.forEach(textElement => {
                        textElement.style.backgroundSize="400%"
                        textElement.animate([
                            // keyframes
                            { backgroundPosition: 'left' }, 
                            { backgroundPosition: 'right' },           
                          ], { 
                            // timing options
                            duration: color.themePic.animation.time*1000,
                            iterations: Infinity,
                            direction: "alternate-reverse",
                            easing:"ease",
                          });
    
                    })
                }
                
            //set button color 
            const gradientButtonElements =elements.filter((element)=>element.classList.contains("gradientButton"))
            const buttonGrads = [ColorScheme['themePicColor']['accent'],ColorScheme['themePicColor']['main'], ColorScheme['themePicColor']['accent1']]
            gradientButtonElements.forEach(gradientButtonElement =>{
                gradientButtonElement.style.backgroundImage=`linear-gradient(${color.themePic.gradients.direction}, ${buttonGrads})`
                gradientButtonElement.style.backgroundSize="200% "  
                gradientButtonElement.style.backgroundPosition="left"
                gradientButtonElement.style.transition="background-position 0.75s"              
                gradientButtonElement.onmouseover=function(){this.style.backgroundPosition="right"}
                gradientButtonElement.onmouseout=function(){this.style.backgroundPosition="left"}

            })

            //set selection color
            if(color.themePic.hasOwnProperty('selection')) {
                var sheet = window.document.styleSheets[0];
                sheet.insertRule(`::selection {background: ${ColorScheme['themePicColor'][color.themePic.selection.selectionColor]}; color: black;}`, sheet.cssRules.length);
            }
                      
            if(color.themePic.hasOwnProperty("animation")){
                const animationGrads = Object.values(ColorScheme['themePicColor'])
                const animationElements = elements.filter((element)=>element.classList.contains("animation"))
                animationElements.map((animationElement)=>{
                    animationElement.style.backgroundImage=`linear-gradient(${color.themePic.gradients.direction}, ${animationGrads})`
                })
                
                const operateElements=animationElements.map((animationElement) => {animationElement.style.backgroundSize="400% 400%"})
                animationElements.forEach(animationElement => {
                    animationElement.animate([
                    // keyframes
                    { backgroundPosition: 'left' }, 
                    { backgroundPosition: '50% 100%' },
                    { backgroundPosition: 'right' }, 

                ], { 
                    duration: color.themePic.animation.time*1000,
                    iterations: Infinity,
                    direction: "alternate",
                    easing:"ease",
                });
            });    
            
             
                }      
           
            }
            
            
        }

        if(color.hasOwnProperty("randomColor")){
            if(color.randomColor.hasOwnProperty("gradients")){
                const grads = Object.values(ColorScheme['themePicColor'])
                const gradientElements=elements.filter((element)=>element.classList.contains("gradient"))
                gradientElements.map((gradientElement)=>{
                    gradientElement.style.backgroundImage=`linear-gradient(${color.randomColor.gradients.direction}, ${grads})`
                })
                //set text color
                const textElements =elements.filter((element)=>element.classList.contains("gradientText"))
                const textgrads = [ColorScheme['themePicColor']['base'], ColorScheme['themePicColor']['main'], ColorScheme['themePicColor']['accent']]
                    textElements.forEach(gradientElement =>{
                        gradientElement.style.backgroundImage=`linear-gradient(${color.randomColor.gradients.direction}, ${textgrads})`
                        gradientElement.style.backgroundClip="text"
                        gradientElement.style.WebkitBackgroundClip="text"
                        gradientElement.style.color="transparent"
        
                    })
                    if(color.randomColor.hasOwnProperty("animation")){
                        textElements.forEach(textElement => {
                            textElement.style.backgroundSize="400%"
                            textElement.animate([
                                // keyframes
                                { backgroundPosition: 'left' }, 
                                { backgroundPosition: 'right' },           
                              ], { 
                                // timing options
                                duration: color.randomColor.animation.time*1000,
                                iterations: Infinity,
                                easing:"ease",
                                direction: "alternate-reverse",
                              });
        
                        })
                    }
                    
                //set button color 
                const gradientButtonElements =elements.filter((element)=>element.classList.contains("gradientButton"))
                const buttonGrads = [ColorScheme['themePicColor']['accent'],ColorScheme['themePicColor']['main'], ColorScheme['themePicColor']['accent1']]
                gradientButtonElements.forEach(gradientButtonElement =>{
                    gradientButtonElement.style.backgroundImage=`linear-gradient(${color.randomColor.gradients.direction}, ${buttonGrads})`
                    gradientButtonElement.style.backgroundSize="200% "  
                    gradientButtonElement.style.backgroundPosition="left"
                    gradientButtonElement.style.transition="background-position 0.75s"              
                    gradientButtonElement.onmouseover=function(){this.style.backgroundPosition="right"}
                    gradientButtonElement.onmouseout=function(){this.style.backgroundPosition="left"}
    
                })
    
                //set selection color
                if(color.randomColor.hasOwnProperty('selection')) {
                    var sheet = window.document.styleSheets[0];
                    sheet.insertRule(`::selection {background: ${ColorScheme['themePicColor'][color.randomColor.selection.selectionColor]}; color: black;}`, sheet.cssRules.length);
                }
                          
                if(color.randomColor.hasOwnProperty("animation")){
                    const animationGrads = Object.values(ColorScheme['themePicColor'])
                    const animationElements = elements.filter((element)=>element.classList.contains("animation"))
                    animationElements.map((animationElement)=>{
                        animationElement.style.backgroundImage=`linear-gradient(${color.randomColor.gradients.direction}, ${animationGrads})`
                    })
                    
                    const operateElements=animationElements.map((animationElement) => {animationElement.style.backgroundSize="400% 400%"})
                    animationElements.forEach(animationElement => {
                        animationElement.animate([
                        // keyframes
                        // { backgroundPosition: 'left' }, 
                        { backgroundPosition: '0% 50%' },
                        { backgroundPosition: '100% 50%' },
                        { backgroundPosition: '0% 50%' }
                        
                        // { backgroundPosition: 'right' }, 
    
                    ], { 
                        duration: color.randomColor.animation.time*1000,
                        iterations: Infinity,
                        easing: "ease",
                        // direction: "alternate",
                    });
                });   
                    this.setGradientPic(color)    
                    this.setAnimatedText(this.states.color,Object.values(ColorScheme['themePicColor']))    
                    }      
               
                }
        }
        


        } 
         
       } //Now the lib can only deal with the pic that can be extracted 5 colors
        // Conditions that color is more than that or less than that will be solved in the next period
        // The function looks so fat and there are dupicate code in the function, hope to change the strucure of the function to reuse the code

   
Colorfor.prototype.setColorforDecoration = function(color, colors) {
    if (typeof color === 'object'){
        if (color.hasOwnProperty("colorforDecoration")){
            if (color.colorforDecoration.shape==="circle"){
                window.onclick = function (e) {
                    // let colorArray=Object.values(ColorScheme[color.theme][color.type])
                    let colorArray = colors
                    let heartNum = Math.floor(Math.random() * colorArray.length);
                    let div = document.createElement("canvas");
                    div.setAttribute("class", "div-box");
                    div.style.color = colorArray[heartNum];
                    div.style.display = "inline-block";
                    div.style.position="absolute"
                    div.style.width ="20px"
                    div.style.height = "20px"
                    div.style.webkitTransform="rotate(45deg)"
                    div.style.transform="rotate(45deg)"
                    div.style.backgroundColor=colorArray[heartNum]
                    div.style.borderRadius="50%"
                    div.style.zIndex="99999"                   
                    document.body.appendChild(div);
                    
                    let x = e.pageX - div.offsetWidth / 2;
                    let y = e.pageY - div.offsetHeight / 2;
                    div.style.left = x + "px";
                    div.style.top = y + "px";
                    
                    let num = Math.round(Math.random());
                    let timer = setInterval(() => {
                        y -= 10;
                        if (num === 0) x -= 10;
                        else x += 10;
                        div.style.left = x + "px";
                        div.style.top = y + "px";
                        
                        if (y < -100) {
                            clearInterval(timer);
                            div.remove();
                        }
                    }, 100);

            }
            }
            if (color.colorforDecoration.shape==="heart"){
                window.onclick = function (e) {
                    let colorArray = colors
                    let heartNum = Math.floor(Math.random() * colorArray.length);
                    let div = document.createElement("div");
                    div.style.display = "inline-block";
                    div.style.position="absolute"
                    div.style.width ="60px"
                    div.style.height = "60px"
                    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg1.setAttribute("class", "div-box")
                    div.setAttribute("viewBox", "0 0 32 29.6")
                    const path =  document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    path.setAttribute("d","M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z");
                    svg1.appendChild(path);
                    svg1.style.color = colorArray[heartNum];
                    svg1.style.display = "inline-block";
                    svg1.style.position="relative"
                    svg1.style.top = "5px"
                    svg1.style.fill=colorArray[heartNum]
                    div.style.zIndex="99999"        
                    div.appendChild(svg1)  
                    document.body.appendChild(div);
                  
                    let x = e.pageX - div.offsetWidth / 2;
                    let y = e.pageY - div.offsetHeight / 2;
                    div.style.left = x + "px";
                    div.style.top = y + "px";
                    
                    let num = Math.round(Math.random());
                    let timer = setInterval(() => {
                        y -= 10;
                        if (num === 0) x -= 10;
                        else x += 10;
                        div.style.left = x + "px";
                        div.style.top = y + "px";
                        
                        if (y < -100) {
                            clearInterval(timer);
                            div.remove();
                        }
                    }, 100);

            }
            }
            if (color.colorforDecoration.shape==="star"){
                window.onclick = function (e) {
                    let colorArray = colors
                    let heartNum = Math.floor(Math.random() * colorArray.length);
                    let div = document.createElement("div");
                    div.style.display = "inline-block";
                    div.style.position="absolute"
                    div.style.width ="20px"
                    div.style.height = "20px"
                    
                    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg1.setAttribute("class", "div-box")
                    svg1.style.width="300px"
                    svg1.style.height="200px"
                   
                    svg1.style.position="absolute"
                   
                    
                    const polygon =  document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                    // polygon.setAttribute("points","100,10 40,198 190,78 10,78 160,198");
                    polygon.setAttribute("points","50,5 20,99 95,39 5,39 80,99");
                    polygon.style.fill=colorArray[heartNum]

                    svg1.appendChild(polygon);

                    svg1.style.zIndex="99999"        
                    div.appendChild(svg1)  
                    document.body.appendChild(div);
                  
                    let x = e.pageX - div.offsetWidth / 2;
                    let y = e.pageY - div.offsetHeight / 2;
                    div.style.left = x + "px";
                    div.style.top = y + "px";
                    
                    let num = Math.round(Math.random());
                    let timer = setInterval(() => {
                        y -= 10;
                        if (num === 0) x -= 10;
                        else x += 10;
                        div.style.left = x + "px";
                        div.style.top = y + "px";
                        
                        if (y < -100) {
                            clearInterval(timer);
                            div.remove();
                        }
                    }, 100);

            }
            }
        }

    }
    
}

Colorfor.prototype.randomColors = function(color) {
    if (typeof color === 'object') {
        const colorToPass = color
        const elements = Array.from(this.targetElements)
        const randomColorPalette=[]
        const setColorforDecoration = this.setColorforDecoration     
        const setGradientPic = this.setGradientPic
        const setAnimatedText = this.setAnimatedText
        // MorandiColors
        
        for (var i = 0; i < 5; i++) {
            let colorInfo ={}
            colorInfo['RGB']=[]
            let heartNum = Math.floor(Math.random() * MorandiColors.length);
            colorInfo['Hex']=MorandiColors[heartNum]
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorInfo['Hex']);
            const r=parseInt(result[1], 16)
            colorInfo['RGB'].push(r)
            const g=parseInt(result[2], 16)
            colorInfo['RGB'].push(g)
            const b=parseInt(result[3], 16)
            colorInfo['RGB'].push(b)
            colorInfo['Yvalue']=0.299*r+0.587*g+0.114*b
            randomColorPalette[randomColorPalette.length]=colorInfo        
          }
          randomColorPalette.sort((a, b) => b.Yvalue- a.Yvalue)
        
        this.paintThemeColor(colorToPass, elements, randomColorPalette, setColorforDecoration,setGradientPic,setAnimatedText)
             
    }else {
        throw new Error('The color format you is not correct')
    }
}

Colorfor.prototype.setGlowingBorder = function(color) {
    if (typeof color === 'object'){
        const colors = []
        for (var i = 0; i < 6; i++) {                      
            const Hex ='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            colors.push(Hex)
          }
        
        const elements = Array.from(this.targetElements)
        const glowingBorderElements =elements.filter((element)=>element.classList.contains("glowingBorder"))
        // console.log("enter")
        console.log("colors", colors)

        if(glowingBorderElements.length>0){
            glowingBorderElements.forEach(borderElement => {
                console.log("enter")
                borderElement.style.position="relative"
               
                var sheet = window.document.styleSheets[0];
                sheet.addRule('.glowingBorder:before','content: " ";');
                sheet.addRule('.glowingBorder:before','position: absolute;');
                sheet.addRule('.glowingBorder:before','top: -2px;');
                sheet.addRule('.glowingBorder:before','left: -2px;');
                sheet.addRule('.glowingBorder:before','background: linear-gradient(45deg'+","+ colors[0]+","+colors[1]+","+colors[2]+","+colors[3]+","+colors[4]+","+colors[3]+","+colors[2]+","+colors[1]+","+ colors[0]+");");
                sheet.addRule('.glowingBorder:before','background-size: 150%;');
                sheet.addRule('.glowingBorder:before','height: calc(100% + 4px);');
                sheet.addRule('.glowingBorder:before','width: calc(100% + 4px);');
                sheet.addRule('.glowingBorder:before','z-index: -1;');
                sheet.addRule('.glowingBorder:before','animation: animate 10s linear infinite;');
             
                sheet.addRule('.glowingBorder:after','content: " ";');
                sheet.addRule('.glowingBorder:after','position: absolute;');
                sheet.addRule('.glowingBorder:after','top: -2px;');
                sheet.addRule('.glowingBorder:after','left: -2px;');
                sheet.addRule('.glowingBorder:after','background: linear-gradient(45deg'+","+ colors[0]+","+colors[1]+","+colors[2]+","+colors[3]+","+colors[4]+","+colors[3]+","+colors[2]+","+colors[1]+","+ colors[0]+");");
                sheet.addRule('.glowingBorder:after','background-size: 150%;');
                sheet.addRule('.glowingBorder:after','height: calc(100% + 4px);');
                sheet.addRule('.glowingBorder:after','width: calc(100% + 4px);');
                sheet.addRule('.glowingBorder:after','z-index: -1;');
                sheet.addRule('.glowingBorder:after','animation: animate 10s linear infinite;');
                sheet.addRule('.glowingBorder:after','filter: blur(40px);');

                var cssKeyframe = document.createElement('style');
                cssKeyframe.type = 'text/css';
                var rules = document.createTextNode('@-webkit-keyframes animate {'+
                '0% { background-position: 0% 0%; }'+
                '50% { background-position: 400% 0%; }'+
                '100% { background-position: 0% 0%; }'+
                '}');
                cssKeyframe.appendChild(rules);
                document.getElementsByTagName("head")[0].appendChild(cssKeyframe);





    
            })

        }

    }
    
}








const ColorScheme = {
        Blue: {
          vintage: {
            base:"#CAE9FF",
            base1:"#B0D9F4",
            main:"#7AB9DE",
            main1:"#5FA8D3",
            accent:"#D38A5E",
            accent1:"#CB713D" //Completed
        },
        modern: {
            base:"#E0FBFC",
            base1:"#BCDEEB",
            main:"#98C1D9",
            main1:"#6B8EAD",
            accent:"#EE6C4D",
            accent1:"#8C4F47" //Completed   
        },
        vivid:{
            base:"#CAE9FF",
            base1:"#B0D9F4",
            base2:"#95C9E9",
            main:"#5FA8D3",
            main1:"#4E91B8",
            main2:"#5098B4",
            accent:"#F3EEC3",
            accent1:"#F7E3AF",
            accent2:"#F7AF9D" //Completed   
        }
        },
        Green: {
            vintage: {
                base:"#E8EAE2",
                base1:"#DFE5D0",
                main:"#9B9E7B",
                main1:"#B8C3B3",
                accent:"#D5C6B5",
                accent1:"#93765A" //Completed
            },
            modern: {
                base:"#F4F1DE",
                base1:"#D8E2CD",
                main:"#81B29A",
                main1:"#9EC2AB",
                accent:"#E07A5F",
                accent1:"#F2CC8F", //Completed        
            },
            vivid:{
                base:"#D3EAEB",
                base1:"#B8DEDC",
                base2:"#9ED2CD",
                main:"#83C5BE",
                main1:"#42999B",
                main2:"#218389",
                accent:"#FFDDD2",
                accent1:"#E29578",
                accent2:"#F2CC8F" //Completed 
            }
            }, 
        Pink: {
            vintage: {
                base:"#F7E5DB",
                base1:"#F6DCD3",
                main:"#F4A7A3",
                main1:"#F39693",
                accent:"#F6BD60",
                accent1:"#BDB17F" //Completed
            },
            modern: {
                base:"#FFF5F0",
                base1:"#FFEAE1",
                main:"#F2B5A1",
                main1:"#E49580",
                accent:"#C8553D",
                accent1:"#82A8A8", //Completed 
            },
            vivid:{
                base:"#F6EAE6",
                base1:"#FBE4DC",
                base2:"#FFDDD2",
                main:"#FFD8D7",
                main1:"#FFCAD4",
                main2:"#FABBC6",
                accent:"#FAEDCB",
                accent1:"#C9E4DE",
                accent2:"#C6DEF1" //Completed 
            }
            }, 
        Coffee: {
            vintage: {
                base:"#FFF1E6",
                base1:"#EDDCD2",
                main:"#DDBEA9",
                main1:"#CB997E",
                accent:"#B7B7A4",
                accent1:"#A5A58D" //Completed
            },
            modern: {
                base:"#BDB2A6",
                base1:"#A5978B",
                main:"#9F7E69",
                main1:"#755147",
                accent:"#673731",
                accent1:"#74433A", //Completed 
            },
            vivid:{
                base:"#E9D5C1",
                base1:"#E7D2C4",
                base2:"#F3E0D3",
                main:"#D2BBA0",
                main1:"#9F7E69",
                main2:"#B3967E",
                accent:"#F2EFC7",
                accent1:"#F7FFE0",
                accent2:"#FFEEE2" //Completed 
            }
            }, 
        Orange: {
            vintage: {
                base:"#FEE2D0",
                base1:"#FFF1E8",
                main:"#F6A15D",
                main1:"#F28F3B",
                accent:"#C8553D",
                accent1:"#588B8B",  //Completed 
            },
            modern: {
                base:"#FFECD1",
                base1:"#FFDFB7",
                main:"#FFB569",
                main1:"#FF9935",
                accent:"#78290F",
                accent1:"#15616D" //Completed 
            },
            
            vivid:{
                base:"#FFF8F4",
                base1:"#FEE2D1",
                base2:"#FDD3B9",
                main:"#F59C28",
                main1:"#9F7E69",
                main2:"#F3771E",
                accent:"#33658A",
                accent1:"#86BBD8",
                accent2:"#758E4F" //Completed 
            }
            }, 
        Purple: {
            vintage: {
                base:"#EAEAED",
                base1:"#E5E2E6",
                main:"#DBD3D8",
                main1:"#F28F3B",
                accent:"#D8B4A0",
                accent1:"#D89781",  //Completed 
            },
            modern: {
                base:"#FBE5F2",
                base1:"#F6E8FC",
                main:"#CBC0D3",
                main1:"#D5D1E9",
                accent:"#DEE2FF",
                accent1:"#ADADC1" //Completed 
            },
            
            vivid:{
                base:"#E1DEE9",
                base1:"#D5CFE1",
                base2:"#DED6DF",
                main:"#C6BBD6",
                main1:"#B6A6CA",
                main2:"#B4A5C9",
                accent:"#A7BED3",
                accent1:"#C6E2E9",
                accent2:"#F1FFC4" 
            }
            }, 
}

const MorandiColors =["#c1cbd7","#afb0b2","#939391","#bfbfbf","#e0e5df","#b5c4b1","#8696a7","#9ca8b8","#ececea","#fffaf4","#96a48b","#7b8b6f",
"#dfd7d7","#656565","#d8caaf","#c5b8a5","#fdf9ee","#f0ebe5","#d3d4cc","#e0cdcf","#b7b1a5","#a29988","#dadad8","#f8ebd8","#965454","#6b5152","#f0ebe5","#cac3bb","#a6a6a8","#7a7281","#a27e7e", "#ead0d1", "#faead3", "#c7b8a1","#c9c0d3","#eee5f8"]

    global.Colorfor = global.Colorfor || Colorfor
})(window)
