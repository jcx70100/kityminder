/* global Layout:true */
KityMinder.registerLayout('mind', kity.createClass({
    base: Layout,

    doLayout: function(node, children) {
        var layout = this;
        var half = Math.ceil(children.length / 2);
        var right = children.slice(0, half);
        var left = children.slice(half);

        var leftLayout = KityMinder.getLayoutInstance('left');
        var rightLayout = KityMinder.getLayoutInstance('right');

        leftLayout.doLayout(node, left);
        rightLayout.doLayout(node, right);

        var box = node.getContentBox();
        node.setVertexOut(box.cx, box.cy);
        node.setLayoutVectorOut(new kity.Vector(0, 0));
    },

    getOrderHint: function(node) {
        var hint = [];
        var box = node.getLayoutBox();
        var offset = 5;

        hint.push({
            type: 'up',
            node: node,
            area: {
                x: box.x,
                y: box.top - node.getStyle('margin-top') - offset,
                width: box.width,
                height: node.getStyle('margin-top')
            },
            path: ['M', box.x, box.top - offset, 'L', box.right, box.top - offset]
        });

        hint.push({
            type: 'down',
            node: node,
            area: {
                x: box.x,
                y: box.bottom + offset,
                width: box.width,
                height: node.getStyle('margin-bottom')
            },
            path: ['M', box.x, box.bottom + offset, 'L', box.right, box.bottom + offset]
        });
        return hint;
    }
}));