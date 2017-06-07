$(document).ready(function () {
    var kids = [];
    $.getJSON("js/kids.json", function (data) {
        data.forEach(function (kid) {
            kids.push(kid);
        });
        $("#kids").html(getKidsHtml(kids));
    });



    function getKidsHtml(kidsArray) {
        var kidsHtml = "";
        kidsArray.forEach(function (kid) {
            kidsHtml += '<div class="kid">' +
                '<div class="panel panel-info">' +
                '<div class="panel-heading">' +
                '<h3>' + kid.name + '</h3>' +
                '</div>' +
                '<div class="panel-body">' +
                '  <div class="col-sm-4">' +
                '     <img class="img-responsive" src="' + kid.image + '">' +
                '   </div>' +
                '    <div class="col-sm-8">' +
                '      <ul>' +
                '        <li><h5>Години: ' + kid.age + '</h5></li>' +
                '         <li><h5>Любим цвят: ' + kid.color + '</h5></li>' +
                '         <li><h5>Любима игра: ' + kid.game + '</h5></li>' +
                '          <li><h5>Любима храна: ' + kid.food + '</h5></li>' +
                '        </ul>' +
                '     </div>' +
                '    </div>' +
                '  </div>';
        })
        return kidsHtml;
    }

    $("#orderByName").click(function () {
        var kidsSortedByName = kids.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        $("#kids").html(getKidsHtml(kidsSortedByName));
        return false;
    })

    $("#orderByAge").click(function () {
        var kidsSortedByAge = kids.sort(function (a, b) {
            return a.age - b.age;
        })
        $("#kids").html(getKidsHtml(kidsSortedByAge));
        return false;
    })

    $("#textFilter").keyup(function () {
        var search = $(this).val();
        var kidsFiltered;
        if (search == '') {
            kidsFiltered = kids;
        } else {
            kidsFiltered = kids.filter(function (kid) {
                return (kid.name.toLowerCase() == search.toLowerCase() || kid.food.toLowerCase() == search.toLowerCase());
            })
        }
        $("#kids").html(getKidsHtml(kidsFiltered));
        return false;
    })

    $("#gameFilter").change(function () {
        var search = $(this).val();
        if (search != "") {
            var kidsFiltered = kids.filter(function (kid) {
                return kid.game == search;
            })
        } else {
            var kidsFiltered = kids;
        }
        $("#kids").html(getKidsHtml(kidsFiltered));
        return false;
    })
});