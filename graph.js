class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices(vertexArray) {
		for (let vertex of vertexArray) {
			this.addVertex(vertex);
		}
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	removeVertex(vertex) {
		for (let neighbour of vertex.adjacent) {
			neighbour.adjacent.delete(vertex);
		}
		this.nodes.delete(vertex);
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start) {
		let toVisitStack = [ start ];
		let seen = new Set();
		let res = [];

		seen.add(start);

		while (toVisitStack.length) {
			let currNode = toVisitStack.pop();
			res.push(currNode.value);

			currNode.adjacent.forEach(neighbour => {
				if (!seen.has(neighbour)) {
					toVisitStack.push(neighbour);
					seen.add(neighbour);
				}
			});
		}
		return res;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
		let toVisitQueue = [ start ];
		let seen = new Set();
		let res = [];

		while (toVisitQueue.length) {
			let currNode = toVisitQueue.shift();

			if (!seen.has(currNode)) {
				seen.add(currNode);
				res.push(currNode.value);
				for (let neighbour of currNode.adjacent) {
					toVisitQueue.push(neighbour);
				}
			}
		}
		return res;
	}
}

module.exports = { Graph, Node };
