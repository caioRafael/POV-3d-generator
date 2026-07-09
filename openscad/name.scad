include <BOSL2/std.scad>

name_text = "3Dev";


text_size = 40;
text_height = 10;
text_color = "black";

base_height = 30;
base_color = "red";

module name_text(){
    text(
        name_text, 
        size=text_size, 
        halign="center", 
        valign="center", 
        font="Arial:style=Bold",
        anchor=BOTTOM
    );
}

module name(folga=0, up_text = false){

    up(up_text ? base_height - text_height / 2 : 0)
    linear_extrude(height=text_height)
        offset(r=folga)
        name_text();
}

module base(){
    linear_extrude(height=base_height)
    offset(r=10)
        name_text();
}


color(base_color)
diff(){
    base();
    tag("remove") name(up_text=true);
}


color(text_color)
move([0, -60, 0])
name(folga=-0.3);