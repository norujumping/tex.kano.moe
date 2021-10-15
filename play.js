const mj = function (tex) {
    svg = MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
    if (svg.getElementsByTagName('merror').length) {
        console.log(svg.getElementsByTagName('mtext')[0].innerHTML)
        throw svg
    }
    return svg
}
const validate_ans = function (tex1, tex2) {
    m1 = mj(tex1).getElementsByTagName('math')[0]
    m2 = mj(tex2).getElementsByTagName('math')[0]
    return m1.isEqualNode(m2)
}
const setup_table = function (container, target, output, input, target_expr) {
    target.innerHTML = '';
    target.appendChild(mj(target_expr))
    input.value = ''
    output.innerHTML = '';
    output.appendChild(mj(input.value));

    input.oninput = function () {
        let node = null
        try {
            input_expr = input.value
            MathJax.typesetClear();
            output_svg = mj(input_expr)
            output.innerHTML = '';
            output.appendChild(output_svg);
            input.classList.remove('err-syntax')
            if (validate_ans(target_expr, input_expr)) {
                console.log('answer correct')
                input.classList.add('correct-input')
                output.classList.add('correct-output')
                output.innerHTML += "<span style='margin-left: 10px;'> ← Correct</span>!"
            }
            else {
                input.classList.remove('correct-input')
                output.classList.remove('correct-output')
            }
        }
        catch (err) {
            console.log(err)
            input.classList.add('err-syntax')
        }
    }
}