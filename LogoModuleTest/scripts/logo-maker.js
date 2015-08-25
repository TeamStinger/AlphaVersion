/**
 * Created by ArgiDux on 8/25/2015.
 */
var divContainer=$('#container');
var drawArea=$('<div>')
    .width(300)
    .height(400)
    .css({
        'display': 'inline-block',
        'float': 'left'
    })
    .on('click', function(event){
        var that=$(event.target);
        console.log(that.parent())

        if(that.hasClass('image') || that.is('img')){

            if(that.is('img')){
                var menu=generateContextEditMenu('image',that.parent()).appendTo(contextMenu);
            } else {
                var menu=generateContextEditMenu('image',that).appendTo(contextMenu);
                //console.log(that);
            }
        }else{
            contextMenu.html('');
        }
    })
    .appendTo(divContainer);


var contextMenu=$('<div>')
    .width(250)
    .height(200)
    .css({
        'background-color': 'blue',
        'display': 'inline-block',
        'float': 'left'
    })
    .appendTo(divContainer);

var optionsArea=$('<div>')
    .width(250)
    .height(200)
    .css({
        'background-color': 'red',
        'display': 'inline-block',
        'float': 'left'
    })
    .appendTo(divContainer);

var colorOptions=getDropDownListOfCollors(["white" ,"green","red",'yellow'])
    .appendTo(optionsArea)
    .on('change', function(){
        var that=$(this);
        var value=that.find(':selected').html();
        drawArea.css({
            'background-color':value
        });
    });

var pictureOptions= getDropDownListOfPicture(
    [
        {optionName:'Select', picture:''},
        {optionName:'Home', picture:'http://findicons.com/files/icons/1580/devine_icons_part_2/128/home.png'}
    ])
    .on('change',function(){
        var that=$(this);
        var value=that.find(':selected').attr('data-url');
        var imageContainer=$('<div>').addClass('image').draggable({
            containment: "parent"
        }).appendTo(drawArea);
        var image=$('<img>').attr('src', value).appendTo(imageContainer);
        imageContainer.width(150).height(150);
    }).appendTo(optionsArea);

/*$('<input />', { type: 'checkbox', id: 'isGreen' })
    .on('change',function(){
        var that=$(this);
        var value=that.is(':checked')

        if(value){
            drawArea.css({
                'background-color': 'green',
            })
        }else{
            drawArea.css({
                'background-color': 'yellow',
            })
        }
    })
    .appendTo(optionsArea);*/

function getDropDownListOfCollors(options){
    var select=$('<select>')
        .attr('id', 'colorOptions');

    for(var i in options){
        var value=options[i];
        var option=$('<option>')
            .html(value)
            .appendTo(select);
    }

    return select;
}

function getDropDownListOfPicture(options){
    var select=$('<select>')
        .attr('id', 'Pictures');

    for(var i in options){
        var value=options[i];
        var option=$('<option>')
            .html(value.optionName)
            .attr('data-url',value.picture)
            .appendTo(select);
    }

    return select;
}
var menuTypes={
    image: 1
};

function getMenuType(string){
    return menuTypes[string];
}
function generateContextEditMenu(typeName,item){
    var typeValue=getMenuType(typeName);

    var menuDiv=$('<div>')
        .width(100)
        .height(100);
    if(typeValue===menuTypes.image){
        var scale=$('<input>').attr('id', 'scale-value').appendTo(menuDiv);
        var movable=$('<input>').attr('type','checkbox').attr('id','is-draggable').appendTo(menuDiv);
        var apply=$('<button>').attr('id', 'apply-change').html('Apply').appendTo(menuDiv)
            .on('click', function(){
                //console.log('ha');
                if(item.is('img')){
                    item=item.parent();
                }
                console.log(item);

                var hDiv=item.height();
                var wDiv=item.width();
                var wImg=item.find('img').width();
                var hImg=item.find('img').height();

                var scaleFactor=$('#scale-value').val();
                console.log(scaleFactor);


                item.height(hDiv*scaleFactor);
                item.width(wDiv*scaleFactor);
                item.find('img').width(wImg*scaleFactor);
                item.find('img').height(hImg*scaleFactor);

                item.center();
                console.log(hDiv*scaleFactor)


            });
    }

    return menuDiv;

}

/*divContainer.width(200)
    .height(200)
    .css('background-color','yellow');*/

