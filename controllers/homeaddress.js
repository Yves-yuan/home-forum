exports.install = function () {
    F.route('/map/world/data', get_address_data);
};

function get_address_data() {
    var result = [];

    var hbase1 = require('hbase');
    var client1 = hbase1({
        host: '10.217.2.231',
        port: 9999
    });
    self = this;
    var t = client1.table("test_spark:home_addr_result");
    t.scan(function (err, datas) {
        if (err -= null){
            console.log(err)
            return
        }
        for (j = 0, len = datas.length; j < len; j++) {
            data = datas[j];
            var k = data.key;
            var v = data.$;
            v = v.slice(1, v.length - 1);
            var varr = v.split(',');
            varr.forEach(function (v,i,arr) {
                arr[i] = parseFloat(v);
            })
            var arr = [];
            arr = arr.concat(varr);
            arr.push(9);
            result.push({name: k, value: arr});
        }
        console.log("length:", result.length);
        self.res.send(result);
    });

    console.log("Receive get address data request");

}