const http = require('http');
const fs = require('fs');

// Nastavíme port, na kterém bude server poslouchat
const PORT = 3000;

// Funkce pro zvýšení hodnoty v counter.txt o 1
function increaseCounter() {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            // Pokud soubor neexistuje, vytvoříme ho s hodnotou 0
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                });
            } else {
                throw err;
            }
        } else {
            // Zvýšíme hodnotu o 1 a uložíme zpět do souboru
            const newValue = parseInt(data) + 1;
            fs.writeFile('counter.txt', newValue.toString(), (err) => {
                if (err) throw err;
                console.log('Counter increased to', newValue);
            });
        }
    });
}

// Funkce pro snížení hodnoty v counter.txt o 1
function decreaseCounter() {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            // Pokud soubor neexistuje, vytvoříme ho s hodnotou 0
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                });
            } else {
                throw err;
            }
        } else {
            // Snížíme hodnotu o 1 a uložíme zpět do souboru
            const newValue = parseInt(data) - 1;
            fs.writeFile('counter.txt', newValue.toString(), (err) => {
                if (err) throw err;
                console.log('Counter decreased to', newValue);
            });
        }
    });
}

// Funkce pro čtení hodnoty v counter.txt
function readCounter(callback) {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            // Pokud soubor neexistuje, vytvoříme ho s hodnotou 0
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                    callback('0');
                });
            } else {
                throw err;
            }
        } else {
            callback(data);
        }
    });
}

// Vytvoříme HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;

    // Pokud je cesta /increase, zvýšíme hodnotu v counter.txt
    if (url === '/increase') {
        increaseCounter();
        res.end('Counter increased');
    }
    // Pokud je cesta /decrease, snížíme hodnotu v counter.txt
    else if (url === '/decrease') {
        decreaseCounter();
        res.end('Counter decreased');
    }
    // Pokud je cesta /read, přečteme hodnotu z counter.txt a odešleme ji zpět
    else if (url === '/read') {
        readCounter((counterValue) => {
            res.end(counterValue);
        });
    }
    // Pokud je cesta jiná, odpovíme chybovým kódem 404
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Spustíme server a posloucháme na zadaném portu
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
