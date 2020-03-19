document.querySelector('#city .custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('#city .custom-select').classList.toggle('open');
})

for (const option of document.querySelectorAll("#city .custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('#city .custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('#city .custom-select').querySelector('#city .custom-select__trigger span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('#city .custom-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

document.querySelector('#shop .custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('#shop .custom-select').classList.toggle('open');
})



window.addEventListener('click', function(e) {
    const select = document.querySelector('#shop .custom-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});


function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

$("#city .custom-option").click(function() {
    $("#shop .custom-select__trigger span").html("Chọn tên quán");
    $("#shop .custom-options").html("");
    let cityId = $(this).data('value');
    readTextFile("json/city.json", function (text) {
        let data = JSON.parse(text);
        data = data.filter(function(rs) {
            return rs.city_id == cityId;
        });
        let k = data.length;
        let str = '';
        let selected = ' selected';
        for(let i = 0; i < k; i++) {
            str += '<span class="custom-option'+selected+'" onclick="changeShop(this,\''+data[i].shop_name+'\');" data-value="'+data[i].shop_id+'">'+data[i].shop_name+'</span>';
            selected = '';
        }
        $("#shop .custom-options").html(str);
    });
});


function changeShop(elem, name) {
    $("#shop .custom-option.selected").removeClass("selected");
    $("#shop .custom-select__trigger span").html(name);
    elem.classList.add("selected");
}