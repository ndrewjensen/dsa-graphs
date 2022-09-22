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
    this.nodes.delete(vertex);
    for (let a of vertex.adjacent) {
      a.adjacent.delete(vertex);
    }
  }

  /** traverse graph with DFS and returns array of Node values */

  depthFirstSearch(start) {
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

  /** find the distance of the shortest path from the start vertex to the end vertex */
  // distanceOfShortestPath(start, end, toVisitStack = [start],
  //   seen = new Set([start]), minDistance = Infinity, distance = 0) {

  //   // if (start === end) return 0;

  //   if (start === end) {
  //     if (distance < minDistance) minDistance = distance;
  //     return minDistance;
  //   }

  //   while (toVisitStack.length) {
  //     for (let neighbor of start.adjacent) {
  //       if (!seen.has(neighbor)) {
  //         toVisitStack.push(neighbor);
  //         seen.add(neighbor);
  //       }
  //     }
  //     distance++;
  //     minDistance = this.distanceOfShortestPath(toVisitStack.pop(),
  //       end,
  //       toVisitStack,
  //       seen,
  //       minDistance,
  //       distance);
  //   }
  //   distance--;
  //   return minDistance;
  // }

  distanceOfShortestPath(start, end) {

    let toVisitStack = [false, start];
    let seen = new Set(toVisitStack);
    let distance = 0;

    while (toVisitStack.length) {
      let currVertex = toVisitStack.shift();

      if (start === end) return distance;

      if (currVertex === false) {
        distance++;
      } else if (currVertex === end) {
        return distance;
      } else {
        for (let neighbor of currVertex.adjacent) {
          if (!seen.has(neighbor)) {
            toVisitStack.push(neighbor);
            seen.add(neighbor);
          }
        }
      }
      toVisitStack.push(false);
    }
  }
}


module.exports = { Graph, Node };
