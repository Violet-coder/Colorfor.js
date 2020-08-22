function useColorfor() {
    var myColorforInstance = new Colorfor({
        elementClass: '.colorfor',
        states : {
            "color": {
                theme:'Orange',
                type: 'vivid',
                gradients: {
                    direction: '45deg'
                },
                animation:{
                    time: 40,         
                },
                gradientPic:{
                    blendingMode:"overlay"
                },
                selection:{
                    selectionColor:"accent"
                },
                colorforDecoration:{
                    shape: "heart"
                },
    
            }
        }
        });
    }
useColorfor();
    