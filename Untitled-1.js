var parentArray1 = [{ "id": 1, "name": "test", "context": [{ "id": 1.1, "name": "test 1.1" }] }, { "id": 2, "name": "test" }, { "id": 3, "name": "test", "context": [{ "id": 3.1, "name": "test 3.1" }] }, { "id": 4, "name": "test" }],
    changedArray = [{ "id": 1, "name": "test1", "context": [{ "id": 1.1, "name": "Changed test 1.1" }] }, { "id": 5, "name": "test5" }];

function insert(array, data) {
    function iter(array) {
        array.forEach(function (a) {
            if (!('id' in a)) {
                return;
            }
            if (o[a.id] !== a) {
                o[a.id] = a;
            }
            Object.keys(a).forEach(function (k) {
                Array.isArray(a[k]) && iter(a[k]);
            });
        });
    }

    var o = {};

    iter(array);
    data.forEach(function (a) {
        if (o[a.id]) {
            Object.keys(a).forEach(function (k) {
                o[a.id][k] = a[k];
            });
            return;
        }
        array.push(a);
    });            
}
insert(parentArray1, changedArray);
console.log(parentArray1);