let type = document.querySelector("#group-by");
console.log(type.value)


    d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
        const margin = {top: 50, right: 20, bottom: 20, left: 50}
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        
        
        const svg = d3.select('.chart').append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.company))
            .range([0, width])
            .paddingInner(0.1)
        
        const yScale = d3.scaleLinear()
            .domain([0,d3.extent(data, d=>d.stores)[1]])
            .range([height, 0])
    
        const xAxis = d3.axisBottom().scale(xScale);
        
        const yAxis = d3.axisLeft().scale(yScale);
            
        svg.append("g")
            .attr("class", "x-axis")
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`);
    
        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .attr("transform", `translate(0 , 0)`);
        
        svg.append("text")
            .attr('class', 'axis-title')
            .attr('x', -10)
            .attr('y', -10)
            .text("Stores")  
            .attr("font-size", "14px")
    

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.company))
        .attr('y', d => yScale(d.stores))
        .attr('width', xScale.bandwidth())
        .attr('height', d=> height - yScale(d.stores))
        .attr('fill', 'lightblue')
        .attr('stroke', 'black')
        .attr('opacity', 0.7)
        .attr('class', 'income')
})


// function update(data, type){

//     xScale.domain(data)

// 	yScale.domain(data)

// 	const bars = svg.selectAll('rect')
//     .data(data)
    
//     bars.enter()
//     .append('rect')
//     .merge(bars)
//     .transition()
//     .duration(1000)  // <-- Now this is new!
//     .attr("y", function(d) {
//         return h - yScale(d);
//     })
//     .attr("height", function(d) {
//         return yScale(d);
//     });

//     bars.exit().remove();

//     svg.select('.x-axis')
//         .call(xAxis)
//     svg.select('.y-axis')
//         .call(yAxis)

//     svg.select('axis-title')
//         .call()
    
// 	// Implement the enter-update-exist sequence

// 	// Update axes and axis title
// }


// d3.csv('coffee-house-chains.csv').then(data => {
// 	update(data); // simply call the update function with the supplied data
// })
