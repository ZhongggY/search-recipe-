const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(0.5)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    //the message will be handled at model.js after throw it
    throw error;
  }
};
export const sentJson = async function (url, uploaddata) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploaddata),
    });

    const res = await Promise.race([fetchPro, timeout(0.5)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    //the message will be handled at model.js after throw it
    throw error;
  }
};
