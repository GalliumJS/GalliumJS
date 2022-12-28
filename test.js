const gallium = require('./index.js');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const window = gallium.init({
    title: 'Gallium',
    width: 800,
    height: 600,
    resizable: true,
});

window.background('Black');

window.ipc(true)

let text1 = window.text('Hello, World!', 10, 10, 'Times New Roman', 10, 'White');

wait(1000).then(() => {
    window.refresh();
});

// wait(1000).then(() => {
//     window.ipc.send(
//         window.edit({
//             var: text1,
//             text: 'Hello, World! (Edited)',
//         })
//     );
// });

// window.on('close', () => {
//     window.exit();
// });

window.run();