exports.install = function () {
    F.route('/', view_index);
    F.route('/forum/display', view_forum);
};


function view_index() {
    var self = this;
    self.view('index');
}

function view_forum() {
    this.view("forum/display")
}