var arr = ["Sony Experia Z1", "Samsung Gallaxy Note 10", "Xiaomi Redmi Note 8", "Apple iPhone 8", 
            "Nokia 6", "Xiaomi Mi 5s Plus", "Huawei Nova 3i"];

function addItem(item) {
    if (item.trim().length > 0) {
        arr.push(item.trim());
        displayItems();
    }
    else {
        $("#item").select();
    }
}

displayItems();

function displayItems()
{
    let text = '';
    for (let i = 0; i < arr.length; i++) {
        text += '<tr>';
        text += '<th scope="row">' + (i + 1) + '</th>';
        text += '<td id="td'+ (i) +'"><span id="span'+ (i) +'">' + arr[i] +'</span></td>';
        text += '<td id="tdEdit'+ (i) +'">' + "<button id='btnEdit"+i+"' onclick='editItem("+ i +",\"" + arr[i] + "\");' class='btn btn-primary bg-info border-0 btnEdit'>Edit</button>" + '</td>';
        text += '<td>' + "<button id='btnDel" + i + "' onclick='deleteItem(" + i + ")'class='btn btn-primary bg-danger border-0 btnDel'>Delete</button>" +'</td>';
        text += '</tr>';
    }
    document.getElementById('countItem').innerHTML = arr.length + " product";
    if (arr.length > 1) {
        document.getElementById('countItem').innerHTML += "s";
    }
    document.getElementById("tbody").innerHTML = text;
}

function editItem(tdid, val) {
    var input, container = document.getElementById("td"+ tdid);
    input = document.createElement("input");
    input.type = "text";
    input.classList = "form-control col-sm-9 mr-3 bg-success text-white";
    input.value = val;
    container.appendChild(input);

    var tdEdit = document.getElementById("tdEdit" + tdid);
    var btnChange = document.createElement("button")
    btnChange.classList = "btn btn-primary bg-info border-0 mr-3";
    btnChange.innerHTML = "Change name";
    btnChange.onclick = function() {
        arr[tdid] = input.value;
        $(btnChange).remove();
        $(btnCancel).remove();
        $(".btnEdit").css("visibility", 'visible');
        $(".btnDel").css("visibility", 'visible');
        $(input).remove();
        $("#span" + tdid).show();
        displayItems();
    };
    tdEdit.appendChild(btnChange);

    var btnCancel = document.createElement("button");
    btnCancel.classList = "btn btn-primary bg-secondary border-0";
    btnCancel.innerHTML = "Cancel";
    btnCancel.onclick = function() {
        $(btnChange).remove();
        $(btnCancel).remove();
        $(".btnEdit").css("visibility", 'visible');
        $(".btnDel").css("visibility", 'visible');
        $(input).remove();
        $("#span" + tdid).show("slow");
        displayItems();
    };
    tdEdit.appendChild(btnCancel);

    $("#span" + tdid).hide();
    $(".btnEdit").css("visibility", 'hidden');
    $(".btnDel").css("visibility", 'hidden');
}

function deleteItem(i){
    var conf = confirm("Are you sure you want to delete \""+ arr[i] + "\" product?");
    if (conf) {
        arr.splice(i,1);
        displayItems();
    }
}