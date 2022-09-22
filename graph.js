"use strict";

/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */

  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */

  removeVertex(vertex) {
    //FIXME: this only handles bi-directional, the solution handles one-directional
    for (let n of this.nodes) {
      n.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */

  depthFirstSearch(start) {
    //FIXME:Solutions used a nice pure recursion, or a helper recursion
    let toVisitStack = [start];
    let output = [];
    let seen = new Set(toVisitStack);

    while (toVisitStack.length) {
      let currVertex = toVisitStack.pop();

      output.push(currVertex.value);

      for (let neighbor of currVertex.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return output;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    //FIXME: alternatively, import the queue class to do it O(n)
    let toVisitStack = [start];
    let output = [];
    let seen = new Set(toVisitStack);

    while (toVisitStack.length) {
      let currVertex = toVisitStack.shift();

      output.push(currVertex.value);

      for (let neighbor of currVertex.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return output;
  }

  /** find the distance of the shortest path
   * from the start vertex to the end vertex */

  //FIXME: alternatively, import the queue class to do it O(n)
  distanceOfShortestPath(
    start,
    end,
    toVisit = [start],
    seen = new Set([start]),
    distance = 0
  ) {
    if (start === end) return 0;
    distance++;
    let nextGen = [];
    for (let v of toVisit) {
      for (let n of v.adjacent) {
        if (n === end) return distance;
        if (!seen.has(n)) {
          nextGen.push(n);
          seen.add(n);
        }
      }
    }
    if (nextGen.length) {
      return this.distanceOfShortestPath(start, end, nextGen, seen, distance);
    }

    return;
  }
}

module.exports = { Graph, Node };
