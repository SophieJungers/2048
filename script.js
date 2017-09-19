(function( $ ) 
{

	$.fn.game2048 = function(width, height) 
	{

	//BLOCK SCROLL PAGE WITH KEYPRESS
	window.addEventListener("keydown", function(e) 
	{
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) 
    { //arrow keys + space bar
    	e.preventDefault();
    }
}, false);


	//FUNCTIONS CALLED
	$(this).append(create_grid(width, height))
	// create_grid(4, 4);
	initialize_tiles(width / 2);
	moving_tiles();
	best_score();




	// DISPLAY A FOUR BY FOUR SQUARE 
	function create_grid(width, height)
	{
		var my_grid = $("<table></table").addClass('my_grid');
		$("#game_over").css({"z-index" : "-100"});
		$("#win").css({"z-index" : "-100"});
		// $("#new_game").css({"z-index" : "-100"});


		for(y=0; y<height; y++)
		{
			var my_line = $("<tr></tr>").addClass('my_line');
			for(x=0; x<width; x++)
			{
				var empty_cell = $("<td></td>").addClass('empty_cell').attr("x", x).attr("y", y).attr("nb", 0);
				my_line.append(empty_cell);

			}
			my_grid.append(my_line);

		}
		return my_grid;
		// $(".my_base").append(my_grid);
	}

	// WITH TWO INSIDE TILES INITIALIZED
	function initialize_tiles(times)
	{

		var table = [2, 2, 4, 2, 2, 4, 2];

		for(i=0; i<times; i++)
		{
			var number = table[Math.floor(Math.random()*table.length)];
			var random_cell_1 = Math.floor(Math.random()*$(".empty_cell").length);
			var selected_cell_1 = $(".empty_cell").eq(random_cell_1);
			selected_cell_1.removeClass().addClass("fully_cell").attr("nb", number).text(number);
		}
		color();
	}

	//MOVING TILES WHEN THE PLAYER PRESS AN ARROW KEY
	function moving_tiles()
	{
		$(document).keydown(function(event)
		{
			if($(".my_grid td:contains('2048')").length == 1)
			{
				$("#win").css({"z-index" : "+100"});
			}
			
			if($(".my_grid td:contains('2048')").length == 0)
			{
				switch(event.key)
				{
					case "ArrowUp":
					move_up();
					break;
					case "ArrowDown":
					move_down();
					break;
					case "ArrowLeft":
					move_left();
					break;
					case "ArrowRight":
					move_right();
					break;
				}
			}
		});
	}

	function move_up()
	{
		var flag = false;
		for(x=0; x<width; x++)
		{
			for(y=0; y<(height-1); y++)
			{
				first_cell= $("td[x='"+x+"'][y='"+y+"']");
				near_cell = $("td[x='"+x+"'][y='"+(y+1)+"']");
				if(parseInt(first_cell.text()) > 0)
				{
					for(j = (y+1); j <= (height - 1); j++)
					{
						near_cell = $("td[x='"+x+"'][y='"+j+"']");
						if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
						{
							first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							score(parseInt(first_cell.text()));
							best_score();
							flag = true;
							break;
						}
						else if(parseInt(near_cell.text()) > 0)
							break;
					}
				}
				else
				{
					for(j= (y+1); j<= (height - 1); j++)
					{
						near_cell = $("td[x='"+x+"'][y='"+j+"']");
						if(parseInt(near_cell.text()) > 0)
						{
							first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							y--;
							flag = true;
							break;
						}
					}
				}
			}
		}
		if(flag == true)
		{
			initialize_tiles(1);
		}
		end_game();
	}

	function move_down()
	{
		var flag = false;
		
		for(x=0; x<width; x++)
		{
			for(y=(height-1); y>0; y--)
			{
				first_cell= $("td[x='"+x+"'][y='"+y+"']");
				near_cell = $("td[x='"+x+"'][y='"+(y-1)+"']");
				if(parseInt(first_cell.text()) > 0)
				{
					for(j= (y-1); j >= 0; j--)
					{
						near_cell = $("td[x='"+x+"'][y='"+j+"']");
						if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
						{
							first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							score(parseInt(first_cell.text()));
							best_score();
							flag = true;
							break;
						}
						else if(parseInt(near_cell.text()) > 0)
							break;
					}
				}
				else
				{
					for(j= (y-1); j >= 0; j--)
					{
						near_cell = $("td[x='"+x+"'][y='"+j+"']");

						if(parseInt(near_cell.text()) > 0)
						{
							first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							flag = true;
							y++;
							break;
						}
					}
				}
			}
		}
		if(flag == true)
		{
			initialize_tiles(1);
		}
		end_game();
	}

	function move_right()
	{
		var flag = false;
		
		for(y=0; y<height; y++)
		{
			for(x=(width-1); x>0; x--)
			{
				first_cell= $("td[x='"+x+"'][y='"+y+"']");
				near_cell = $("td[x='"+(x-1)+"'][y='"+y+"']");
				if(parseInt(first_cell.text()) > 0)
				{
					for(j= (x-1); j >= 0; j--)
					{
						near_cell = $("td[x='"+j+"'][y='"+y+"']");
						if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
						{
							first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							score(parseInt(first_cell.text()));
							best_score();
							flag = true;
							break;
						}
						else if(parseInt(near_cell.text()) > 0)
							break;
					}
				}
				else
				{
					for(j= (x-1); j >= 0; j--)
					{
						near_cell = $("td[x='"+j+"'][y='"+y+"']");

						if(parseInt(near_cell.text()) > 0)
						{
							first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							flag = true;
							x++;
							break;
						}
					}
				}
			}
		}
		if(flag == true)
		{
			initialize_tiles(1);
		}
		end_game();
	}


	function move_left()
	{
		var flag = false;
		
		for(y=0; y<height; y++)
		{
			for(x=0; x<(width-1); x++)
			{
				first_cell= $("td[x='"+x+"'][y='"+y+"']");
				near_cell = $("td[x='"+(x+1)+"'][y='"+y+"']");
				if(parseInt(first_cell.text()) > 0)
				{
					for(j = (x+1); j <= (width-1) ; j++)
					{
						near_cell = $("td[x='"+j+"'][y='"+y+"']");
						if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
						{
							first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							score(parseInt(first_cell.text()));
							best_score();
							flag = true;
							break;
						}
						else if(parseInt(near_cell.text()) > 0)
							break;
					}
				}
				else
				{
					for(j= (x+1); j<= (width - 1); j++)
					{
						near_cell = $("td[x='"+j+"'][y='"+y+"']");

						if(parseInt(near_cell.text()) > 0)
						{
							first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
							near_cell.text("").removeClass().addClass("empty_cell").attr("nb", 0);
							flag = true;
							x--;
							break;
						}
					}
				}
			}
		}
		if(flag == true)
		{
			initialize_tiles(1);
		}
		end_game();
	}


	function color()
	{
		
		for(x=0; x<width; x++)
		{
			for(y=0; y<height; y++)
			{
				$(".fully_cell").each(function() {
					switch($(this).text())
					{
						case "2":
						$(this).addClass("yellow");
						break;
						case "4":
						$(this).addClass("orange");
						break;
						case "8":
						$(this).addClass("red");
						break;
						case "16":
						$(this).addClass("green");
						break;
						case "32":
						$(this).addClass("purple");
						break;
						case "64":
						$(this).addClass("pink");
						break;
						case "128":
						$(this).addClass("green_blue");
						break;
						case "256":
						$(this).addClass("blood_orange");
						break;
						case "512":
						$(this).addClass("olive");
						break;
						case "1024":
						$(this).addClass("dark_blue");
						break;
						case "2048":
						$(this).addClass("strong_red");
						break;
					}
				});
			}
		}
	}

	function end_game()
	{
		if($(".empty_cell").length == 0)
		{
			for(x=0; x<width; x++)
			{
				for(y=0; y<height; y++)
				{
					var current_cell = parseInt($("td[x='"+x+"'][y='"+y+"']").text());
					var move_right = parseInt($("td[x='"+(x-1)+"'][y='"+y+"']").text());
					var move_left = parseInt($("td[x='"+(x+1)+"'][y='"+y+"']").text());
					var move_down = parseInt($("td[x='"+x+"'][y='"+(y-1)+"']").text());
					var move_up = parseInt($("td[x='"+x+"'][y='"+(y+1)+"']").text());
					if( current_cell == move_right || current_cell == move_left || current_cell == move_down || current_cell == move_up)
					{
						console.log("inside if");
						return;
					}
				}
			}
			$("#game_over").css({"z-index" : "+100"});
			}
		}	


		function score(points)
		{
			var current_score = $(".current_score");
			var score = parseInt(current_score.text());
			var updated_score = (score + points);
			current_score.text(updated_score);
		}

		function best_score()
		{
			var score_area = $(".current_score");
			var bestscore_area = $(".best_score");

			var score_tmp = parseInt(score_area.text());
		// localStorage.setItem("Max_Score", 0);
		var bestscore = localStorage.getItem("Max_Score");

		if(score_tmp > bestscore)
		{
			bestscore_area.text(score_tmp);
			localStorage.setItem("Max_Score", score_tmp);
		}
		else
		{
			bestscore_area.text(bestscore);
			localStorage.setItem("Max_Score", bestscore);
		}
	}

	function reset()
	{
		for(x=0; x<width; x++)
		{
			for(y=0; y<height; y++)
			{
				var current_cell = ($("td[x='"+x+"'][y='"+y+"']").text("").removeClass().addClass("empty_cell").attr("nb", 0));
			}
		}
		$(".current_score").text(0);
	}

	$(".new_game").click(function() 
	{
		$("#game_over").css({"z-index" : "-100"});
		
		reset();
		initialize_tiles(2);
	})
};

}( jQuery ));