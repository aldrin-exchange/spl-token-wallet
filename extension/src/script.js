window.aldrin = {
  postMessage: (message) => {
    const listener = (event) => {
      if (event.detail.id === message.id) {
        window.removeEventListener('aldrin_contentscript_message', listener);
        window.postMessage(event.detail);
      }
    };
    window.addEventListener('aldrin_contentscript_message', listener);

    window.dispatchEvent(
      new CustomEvent('aldrin_injected_script_message', { detail: message }),
    );
  },
};
