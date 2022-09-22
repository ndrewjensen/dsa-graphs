"use strict";

const { Queue, QNode } = require("./queue");

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
    for (let n of this.nodes) {
      n.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */

  // depthFirstSearch(start) {
  //   let toVisitStack = [start];
  //   let output = [];
  //   let seen = new Set(toVisitStack);

  //   while (toVisitStack.length) {
  //     let currVertex = toVisitStack.pop();

  //     output.push(currVertex.value);

  //     for (let neighbor of currVertex.adjacent) {
  //       if (!seen.has(neighbor)) {
  //         toVisitStack.push(neighbor);
  //         seen.add(neighbor);
  //       }
  //     }
  //   }
  //   return output;
  // }


  /** RECURSION: traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, output = [], seen = new Set([start])) {
    output.push(start.value);

    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        this.depthFirstSearch(neighbor, output, seen);
      }
    }
    return output;
  }

  // /** traverse graph with BDS and returns array of Node values */
  // breadthFirstSearch(start) {
  //   let toVisitStack = [start];
  //   let output = [];
  //   let seen = new Set(toVisitStack);

  //   while (toVisitStack.length) {
  //     let currVertex = toVisitStack.shift();

  //     output.push(currVertex.value);

  //     for (let neighbor of currVertex.adjacent) {
  //       if (!seen.has(neighbor)) {
  //         toVisitStack.push(neighbor);
  //         seen.add(neighbor);
  //       }
  //     }
  //   }
  //   return output;
  // }


  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let q = new Queue();
    let output = [];
    let seen = new Set([start]);

    q.enqueue(start);

    while (q.size) {
      let currVertex = q.dequeue();

      output.push(currVertex.value);

      for (let neighbor of currVertex.adjacent) {
        if (!seen.has(neighbor)) {
          q.enqueue(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return output;
  }

  // /** find the distance of the shortest path
  //  * from the start vertex to the end vertex */
  // distanceOfShortestPath(
  //   start,
  //   end,
  //   toVisit = [start],
  //   seen = new Set([start]),
  //   distance = 0
  // ) {
  //   if (start === end) return 0;
  //   distance++;
  //   let nextGen = [];
  //   for (let v of toVisit) {
  //     for (let n of v.adjacent) {
  //       if (n === end) return distance;
  //       if (!seen.has(n)) {
  //         nextGen.push(n);
  //         seen.add(n);
  //       }
  //     }
  //   }
  //   if (nextGen.length) {
  //     return this.distanceOfShortestPath(start, end, nextGen, seen, distance);
  //   }

  //   return;
  // }


  /** find the distance of the shortest path
   * from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {

    if (start === end) return 0;

    let q = new Queue();
    let seen = new Set([start]);
    q.enqueue([start, 0]);

    while (q.size) {

      let [currVertex, distance] = q.dequeue();

      if (currVertex === end) return distance;

      for (let neighbor of currVertex.adjacent) {
        if (!seen.has(neighbor)) {
          q.enqueue([neighbor, distance + 1]);
          seen.add(neighbor);
        }
      }
    }
  }

}

module.exports = { Graph, Node };
