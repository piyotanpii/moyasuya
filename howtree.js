// ノードを持つ配列の作成　根
var nodes = new vis.DataSet([
    { id: 1, label: "例：一回あたりの量が多い" },
    { id: 2, label: "自力で減らす" },
    { id: 3, label: "他力で減らす" },
    { id: 4, label: "心理的制限" },
    { id: 5, label: "物理的制限" },
]);

// エッジを持つ配列の作成　枝
var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
]);

// ネットワーク作成
var container = document.getElementById("network");

var data = {
    nodes: nodes,
    edges: edges,
};

var options = {
    layout: {
        hierarchical: {
            direction: "UD",
            sortMethod: "directed",
        }
    }
};

var network = new vis.Network(container, data, options);

network.on("click", function(params) {
    console.log(params);
    clickedInfo = params;
    if (params.nodes.length == 1) {
        var nodeId = params.nodes[0];
        isNodeClicked = true;
        clickedNodeId = nodeId;
        console.log(nodeId + ' clicked!!!');
    } else {
        initClickObj();
        console.log("Out!!!")
    }
});

function initClickObj() {
    isNodeClicked = false;
    clickedNodeId = null;
}

function addNode(id, label) {
    nodes.add([
        { id: id, label: label }
    ]);
}

function connectNodes(fromId, toId) {
    edges.add([
        { from: fromId, to: toId }
    ])
}

function updateNode(id, label) {
    nodes.update({ id: id, label: label });
}

document.getElementById("changeBtn").addEventListener("click", () => {
    if (!isNodeClicked) { return; }
    updateNode(clickedNodeId, document.getElementById("userInput").value);
})

document.getElementById("addBtn").addEventListener("click", () => {
    if (!isNodeClicked) { return; }
    addNode(newIdNum, document.getElementById("userInput").value);
    connectNodes(clickedNodeId, newIdNum);
    newIdNum++;
})

document.getElementById("removeBtn").addEventListener("click", () => {
    if (!isNodeClicked) { return; }
    nodes.remove(clickedNodeId);
    initClickObj();
})

document.getElementById("reConnectBtn").addEventListener("click", () => {
    if (!isNodeClicked) { return; }
    edges.remove(clickedInfo.edges[0]);

})

document.getElementById("redoBtn").addEventListener("click", () => {

})