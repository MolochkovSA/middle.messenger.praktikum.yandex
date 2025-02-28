export const inputFieldTemplate = `
  <div class="{{className}}">
    {{{ Input }}}
    
    {{#if label}}
      <label for={{id}}>{{label}}</label>
    {{/if}} 

    {{#if errorMessage}}
      <p>{{errorMessage}}</p>
    {{/if}}  
  </div>
  `
