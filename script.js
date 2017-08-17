//FUNCTIONS CALLED
create_grid(4, 4);
initialize_tiles(2);
moving_tiles();




// DISPLAY A FOUR BY FOUR SQUARE 
function create_grid(width, height)
{
	var my_grid = $("<table></table").addClass('my_grid');

	for(y=0; y<height; y++)
	{
		var my_line = $("<tr></tr>").addClass('my_line');
		for(x=0; x<width; x++)
		{
			var my_cell = $("<td></td>").addClass('my_cell').attr("x", x).attr("y", y).attr("nb", 0);
			my_line.append(my_cell);

		}
		my_grid.append(my_line);

	}
	$(".my_base").append(my_grid);

}

// WITH TWO INSIDE TILES INITIALIZED
function initialize_tiles(times)
{
	//STEP 1 : INITIALIZE RANDOM NUMBERS
	var table = [2, 2, 4, 2, 2, 4, 2];

	for(i=0; i<times; i++)
	{
		var number = table[Math.floor(Math.random()*table.length)];
		var random_cell_1 = Math.floor(Math.random()*$(".my_cell").length);
		var selected_cell_1 = $(".my_cell").eq(random_cell_1);
		selected_cell_1.removeClass().addClass("fully_cell").attr("nb", number).text(number);
	}
	color(4, 4);




	// //STEP 2 : INITIALIZE RANDOM CELLS WITH VALUES
	// var random_x = Math.floor(Math.random()*4);
	// var random_y = Math.floor(Math.random()*4);


	// var selected_cell_1 = $("td[x='"+random_x+"'][y='"+random_y+"']");
	// selected_cell_1.removeClass().addClass("begin_cell").text(number);

	// 	var selected_cell_2 = $("td[x='"+random_x+"'][y='"+random_y+"']");
	// selected_cell_2.removeClass().addClass("begin_cell").text(number);


}

//MOVING TILES WHEN THE PLAYER PRESS AN ARROW KEY
function moving_tiles()
{
	$(document).keydown(function(event)
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
	});
}

function move_up()
{
	var flag = false;
	for(x=0; x<4; x++)
	{
		for(y=0; y<3; y++)
		{
			first_cell= $("td[x='"+x+"'][y='"+y+"']");
			near_cell = $("td[x='"+x+"'][y='"+(y+1)+"']");
			if(parseInt(first_cell.text()) > 0)
			{
				for(j = (y+1); j <= 3; j++)
				{
					near_cell = $("td[x='"+x+"'][y='"+j+"']");
					if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
					{
						first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						break;
					}
					else if(parseInt(near_cell.text()) > 0)
						break;
				}
			}
			else
			{
				for(j= (y+1); j<=3; j++)
				{
					near_cell = $("td[x='"+x+"'][y='"+j+"']");

					if(parseInt(near_cell.text()) > 0)
					{
						first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						y--;
						flag = true;
						break;
					}
				}
			}
		}
	}
	if(flag == true)
		initialize_tiles(1);
}

function move_down()
{
	var flag = false;
	
	for(x=0; x<4; x++)
	{
		for(y=3; y>0; y--)
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
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
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
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						y++;
						break;
					}
				}
			}
		}
	}
	if(flag == true)
		initialize_tiles(1);
}

function move_right()
{
	var flag = false;
	
	for(y=0; y<4; y++)
	{
		for(x=3; x>0; x--)
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
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
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
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						x++;
						break;
					}
				}
			}
		}
	}
	if(flag == true)
		initialize_tiles(1);
}


function move_left()
{
	var flag = false;
	
	for(y=0; y<4; y++)
	{
		for(x=0; x<3; x++)
		{
			first_cell= $("td[x='"+x+"'][y='"+y+"']");
			near_cell = $("td[x='"+(x+1)+"'][y='"+y+"']");
			if(parseInt(first_cell.text()) > 0)
			{
				for(j = (x+1); j <= 3; j++)
				{
					near_cell = $("td[x='"+j+"'][y='"+y+"']");
					if(parseInt(first_cell.text()) == parseInt(near_cell.text()))
					{
						first_cell.text(near_cell.text()*2).removeClass().addClass("fully_cell").attr("nb", near_cell.text()*2);
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						break;
					}
					else if(parseInt(near_cell.text()) > 0)
						break;
				}
			}
			else
			{
				for(j= (x+1); j<=3; j++)
				{
					near_cell = $("td[x='"+j+"'][y='"+y+"']");

					if(parseInt(near_cell.text()) > 0)
					{
						first_cell.text(near_cell.text()).removeClass().addClass("fully_cell").attr("nb", near_cell.text());
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						x--;
						break;
					}
				}
			}
		}
	}
	if(flag == true)
		initialize_tiles(1);
}


function move_right()
{
	var flag = false;
	
	for(y=0; y<4; y++)
	{
		for(x=3; x>0; x--)
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
						first_cell.text(near_cell.text()*2).addClass("fully_cell").attr("nb", near_cell.text()*2);
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
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
						first_cell.text(near_cell.text()).addClass("fully_cell").attr("nb", near_cell.text());
						near_cell.text("").removeClass().addClass("my_cell").attr("nb", 0);
						flag = true;
						x++;
						break;
					}
				}
			}
		}
	}
	if(flag == true)
		initialize_tiles(1);
}


function color(width, height)
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
					$(this).addClass("blue");
					break;
					case "312":
					$(this).css('background-color', '#e5af77');
					break;
					case "624":
					$(this).css('background-color', '#e5af77');
					break;
					case "1048":
					$(this).css('background-color', '#e5af77');
					break;
				}
			});
		}
	}
}
