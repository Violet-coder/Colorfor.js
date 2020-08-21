function useColorfor() {
    var myColorforInstance = new Colorfor({
    elementClass: '.colorfor',
    states : {
        "color": {
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
