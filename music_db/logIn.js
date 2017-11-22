$(document).on('click','#check',function(){
    var pass = $('#password').val();
    var login = $('#login').val();

    $.ajax({
        type : 'POST',
        url : 'http://localhost:3000/checkLogIn',
        data : 'login='+login+'&password='+pass,
        success: function(data){
            console.log(data);
            window.location = data.redirect;

            }

    });

})

$(document).on('click','#getSong',function(){
    $.ajax({
        type : 'POST',
        url : 'http://localhost:3000/main/giveRandomSong',
        success: function(data){
            getItunesInf(data.name, data.title);

            }

    });

})

function getItunesInf(artist,song)
{
    console.log(artist+" "+song);
        $.ajax({
        url: "http://itunes.apple.com/search?term="+artist+"+"+song,
        dataType: 'JSON'
    })
    .done(function(data) { console.log(data);temp=data; fillGaps(data);
 })
    .fail(function(data) { console.log(data); })
        $('#artist').text(artist);
        $('#song').text(song);

}
function fillGaps(data)
{
    $('#cover').attr("src",data.results[0].artworkUrl100);
    $('#player').attr("src",data.results[0].previewUrl);
}

