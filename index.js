const { spawn } = require('child_process');
const fs = require('fs');
const axios = require('axios');

module.exports = {
    init: function(config) {
        if (!config) config = {};

        if (!config.title) config.title = 'Gallium';

        if (!config.width) config.width = 300;

        if (!config.height) config.height = 200;

        if (!config.resizable) config.resizable = false;

        if (!config.fullscreen) config.fullscreen = false;

        if (!config.icon) {
            config.icon = 'icon.ico';
            axios.get('https://raw.githubusercontent.com/GalliumJS/GalliumJS/main/cion.ico', { responseType: 'arraybuffer' })
            .then(function (response) {
                fs.writeFileSync('icon.ico', Buffer.from(response.data, 'binary'));
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        if (!config.borderless) config.borderless = 'Fixed3D';

        if (config.borderless == true) config.borderless = 'None';

        if (config.borderless == false) config.borderless = 'Fixed3D';

        const app = fs.writeFileSync('app.ps1', `Add-Type -AssemblyName System.Windows.Forms

$form = New-Object System.Windows.Forms.Form
$form.Text = "${config.title}"
$form.Width = ${config.width}
$form.Height = ${config.height}
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Sizable
$form.MaximizeBox = $${config.resizable}
$form.MinimizeBox = $${config.resizable}
$form.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen
$form.TopMost = $true
$form.ShowIcon = $true
$form.ShowInTaskbar = $true
$form.TopMost = $true
$form.WindowState = [System.Windows.Forms.FormWindowState]::Normal
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Fixed3D
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedSingle
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedToolWindow
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Sizable
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::SizableToolWindow
$form.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon("${config.icon}")
$form.TopMost = $true
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::${config.borderless}
`);

        return {
            draw: function() {},
            clear: function() {
                fs.writeFileSync('app.ps1', fs.readFileSync('app.ps1') + `
$form.Refresh()
                `);
            },
            text: function(text, x, y, font, size, color) {
                fs.writeFileSync('app.ps1', fs.readFileSync('app.ps1') + `
$label = New-Object System.Windows.Forms.Label
$label.Text = "${text}"
$label.Font = New-Object System.Drawing.Font("${font}", ${size})
$label.ForeColor = [System.Drawing.Color]::${color}
$label.Location = New-Object System.Drawing.Point(${x}, ${y})
$form.Controls.Add($label)
`);
                return {
                    Visible: function(vari) {
                        fs.writeFileSync('app.ps1', fs.readFileSync('app.ps1') + `
$label.Visible = $${vari}
`);
                    },
                    Text: text,
                    Font: font,
                    Color: color,
                    X: x,
                    Y: y
                };
            },
            run: function() {
                fs.writeFileSync('app.ps1', fs.readFileSync('app.ps1') + `\n$form.ShowDialog()\n`);
                spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-File', 'app.ps1']);
            },

            refresh: function() {
                fs.writeFileSync('app.ps1', fs.readFileSync('app.ps1') + `
$form.Refresh()
`);
            },
        }

    }
};