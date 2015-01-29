var map = (function() {
	var pool = [],
		maze02 = [
		[
			{  //Position [0,0]
				left: 0, 
				top: 0,
				right: 1,
				bottom: 1,
				token: false
			},
			{   //Position [1,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [2,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 1,
				token: true
			},
			{   //Position [3,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [4,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [5,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [6,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 1,
				token: true
			},
			{	//Position [7,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [8,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [9,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 1,
				token: true
			},
			{	//Position [10,0]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [11,0]
				left: 1,
				top: 0,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,1]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,1]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [3,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [5,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,1]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [9,1]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [10,1]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,1]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,2]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,2]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,2]
				left: 0,
				top: 1,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [3,2]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [4,2]
				left: 1,
				top: 0,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,2]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,2]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,2]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: true
			},
			{	//Position [8,2]
				left: 0,
				top: 0,
				right: 1,
				bottom: 1,
				token: true
			},
			{	//Position [9,2]
				left: 1,
				top: 1,
				right: 0,
				bottom: 0,
				token: true
			},
			{	//Position [10,2]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,2]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,3]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,3]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,3]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,3]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [9,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: true
			},
			{	//Position [10,3]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: true
			},
			{	//Position [11,3]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,4]
				left: 0, 
				top: 1,
				right: 1,
				bottom: 1,
				token: true
			},
			{   //Position [1,4]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [2,4]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [3,4]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [4,4]
				left: 1,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,4]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,4]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,4]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,4]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [9,4]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [10,4]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,4]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,5]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,5]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,5]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,5]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [9,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [10,5]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,5]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,6]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,6]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,6]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [7,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,6]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [9,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [10,6]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,6]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,7]
				left: 0, 
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,7]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,7]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,7]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,7]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [5,7]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [6,7]
				left: 0,
				top: 1,
				right: 1,
				bottom: 1,
				token: true
			},
			{	//Position [7,7]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [8,7]
				left: 1,
				top: 1,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [9,7]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [10,7]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [11,7]
				left: 1,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,8]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,8]
				left: 0,
				top: 1,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [5,8]
				left: 1,
				top: 0,
				right: 1,
				bottom: 1,
				token: true
			},
			{	//Position [6,8]
				left: 1,
				top: 1,
				right: 0,
				bottom: 0,
				token: true
			},
			{	//Position [7,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [9,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [10,8]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,8]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,9]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{   //Position [1,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [2,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{   //Position [3,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [4,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [5,9]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			},
			{	//Position [6,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [7,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [8,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [9,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [10,9]
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				token: false
			},
			{	//Position [11,9]
				left: 0,
				top: 1,
				right: 0,
				bottom: 1,
				token: true
			}
		],
		[
			{  //Position [0,10]
				left: 0,
				top: 1,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [1,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [2,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{   //Position [3,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [4,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [5,10]
				left: 1,
				top: 1,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [6,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [7,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [8,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [9,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [10,10]
				left: 1,
				top: 0,
				right: 1,
				bottom: 0,
				token: true
			},
			{	//Position [11,10]
				left: 1,
				top: 1,
				right: 0,
				bottom: 0,
				token: true
			}
		]			
	];

	if (map && map.mazes && Array.isArray(map.mazes)) {
		pool = map.mazes;
	}
	pool.push(maze02);

	return {
		mazes: pool
	}
}());