opentype.load('webfonts/thematter-bold.ttf', (err, font1) => {
  opentype.load('webfonts/subset-NotoSansThaiUI-Bold.woff', (err, font2) => {
    const path1 = font1.getPath('รัฐธรรมนูญ', 0, 200, 72);
    const path2 = font2.getPath('รัฐธรรมนูญ', 0, 200, 72);

    const rings1 = flubber.splitPathString(path1.toPathData());
    const rings2 = flubber.splitPathString(path2.toPathData());

    const svg = d3.select("svg");
    let path = svg.selectAll("path")
      .data(d3.range(Math.min(rings1.length, rings2.length)))
      .join(enter => enter.append("path"))
      .attr("d", (d) => rings1[d]);

    let click_num = 0;
    svg.on("click", () => {
      switch(click_num % 2) {
        case 0: path.transition().attrTween("d", (d) => flubber.interpolate(rings1[d], rings2[d])); break;
        case 1: path.transition().attrTween("d", (d) => flubber.interpolate(rings2[d], rings1[d])); break;
      }
      click_num++;
    })

    function update() {
      switch(click_num % 2) {
        case 0: path.transition().attrTween("d", (d) => flubber.interpolate(rings1[d], rings2[d])); break;
        case 1: path.transition().attrTween("d", (d) => flubber.interpolate(rings2[d], rings1[d])); break;
      }
      click_num++;
    }
    setInterval(update, 1000);
  })
});