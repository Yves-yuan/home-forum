exports.install = function() {
    F.route('/diag/app/useCount', getAppUseCountData);
};

function getAppUseCountData() {
    var hbase = require('hbase');
    self = this;
    var result = [];
    var client1 = hbase({
        host: '10.217.2.231',
        port: 9999
    });
    var t = client1.table("test_spark:app_count");

    t.scan(function (err, datas) {
        if (err!=null){
            console.log(err)
        }
        for (j = 0, len = datas.length; j < len; j++) {
            data = datas[j];
            var k = data.key;
            var v = data.$;
            result.push({name: k, value: v});
        }
        console.log("length:", result.length);
        self.res.send(result);
    });

    console.log("Receive app use count data request.");
}