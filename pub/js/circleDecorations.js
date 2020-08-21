function useColorfor() {
    var myColorforInstance = new Colorfor({
    elementClass: '.colorfor',
    states : {
        "color": {
            theme:'Blue',
            type: 'vintage',
            gradients: {
                direction: '45deg'
            },
            animation:{
                time: 10,         
            },
            gradientPic:{
                blendingMode:"overlay"
            },
            selection:{
                selectionColor:"accent"
            },
            colorforDecoration:{
                shape: "circle"
            },

            randomColor:{
                gradients: {
                    direction:'-45deg'
                },
                animation:{
                    time: 15,              
                },
                selection:{
                    selectionColor:"accent"
                }             
            }

        }
    }
    });
}

useColorfor();
