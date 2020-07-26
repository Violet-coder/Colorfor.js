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
                time: 10,         
            },
            gradientPic:{
                blendingMode:"overlay"
            },
            selection:{
                selectionColor:"accent"
            },
            // themePic:{
            //     gradients: {
            //         direction:'45deg'
            //     },
            //     animation:{
            //         time: 2,              
            //     },
            //     selection:{
            //         selectionColor:"accent"
            //     }             
            // }

        }
    }
    });
