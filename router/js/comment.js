let giscusTheme = localStorage.getItem("modeByThean") || "light";
                    // if(giscusTheme == null){
                    //     localStorage.setItem("modeByThean","light");
                    //     giscusTheme = 'light';
                    // }
                    let giscusAttributes = {
                        "src": "https://giscus.app/client.js",
                        "data-repo": "dangth12/docs",
                        "data-repo-id": "R_kgDOI5SZdw",
                        "data-category": "Announcements",
                        "data-category-id": "DIC_kwDOI5SZd84CT-UT",
                        "data-mapping": "og:title",
                        "data-strict": "0",
                        "data-reactions-enabled": "1",
                        "data-emit-metadata": "0",
                        "data-input-position": "bottom",
                        "data-theme": giscusTheme,
                        "data-lang": "vi",
                        "crossorigin": "anonymous",
                        "async": "",
                    };

                    let giscusScript = document.createElement("script");
                    Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
                    // document.body.appendChild(giscusScript);

                    let content = document.getElementById('cmt');
                    content.appendChild(giscusScript);