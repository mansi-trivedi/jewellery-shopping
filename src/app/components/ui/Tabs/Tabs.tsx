import React, {
  useState,
  useRef,
  Children,
  cloneElement,
  ButtonHTMLAttributes,
  useCallback,
  FC,
  ReactElement,
  ReactNode,
  forwardRef,
  ComponentPropsWithRef,
} from "react";

type TabsProps = {
  children: React.ReactNode;
  defaultActiveKey?: string;
  id?: string;
  className?: string;
};

type TabProps = {
  children: React.ReactNode;
  eventKey: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentPropsWithRef<"button">;

/** Method to determine whether given element is a valid react element or not */
function isTabElement(element: ReactNode): element is ReactElement<TabProps> {
  if (React.isValidElement(element) && typeof element.type !== "string") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = (element as ReactElement<any>).props;
    return (
      typeof props === "object" &&
      props !== null &&
      "eventKey" in props &&
      typeof props.eventKey === "string" &&
      "title" in props &&
      typeof props.title === "string"
    );
  }
  return false;
}

const Tabs: FC<TabsProps> = (props) => {
  let initialActiveKey: string | undefined;
  const { defaultActiveKey, id = "tabs", className = "", children } = props;
  const childrenArray = Children.toArray(children);
  if (childrenArray.length > 0) {
    const firstChild = childrenArray[0];
    if (isTabElement(firstChild)) {
      initialActiveKey = firstChild.props.eventKey;
    }
  }
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || initialActiveKey || ""
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement>>({});

  const handleTabClick = useCallback((tabKey: string) => {
    setActiveKey(tabKey);
    if (tabRefs.current[tabKey]) {
      tabRefs.current[tabKey]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, key: string) => {
      const tabArray = Children.toArray(
        children
      ) as React.ReactElement<TabProps>[];
      const currentIndex = tabArray.findIndex(
        (child) => child.props.eventKey === key
      );
      let newIndex = currentIndex;

      switch (event.key) {
        case "ArrowLeft":
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabArray.length - 1;
          break;
        case "ArrowRight":
          newIndex = currentIndex < tabArray.length - 1 ? currentIndex + 1 : 0;
          break;
        case "Home":
          newIndex = 0;
          break;
        case "End":
          newIndex = tabArray.length - 1;
          break;
        case "Enter":
        case " ":
          handleTabClick(key);
          break;
        default:
          return;
      }

      event.preventDefault();
      let nextKey = tabArray[newIndex].props.eventKey;
      while (tabArray[newIndex].props.disabled) {
        if (event.key === "ArrowLeft") {
          newIndex = newIndex > 0 ? newIndex - 1 : tabArray.length - 1;
        } else if (event.key === "ArrowRight") {
          newIndex = newIndex < tabArray.length - 1 ? newIndex + 1 : 0;
        }
        nextKey = tabArray[newIndex].props.eventKey;
      }

      handleTabClick(nextKey);
    },
    [children, handleTabClick]
  );

  return (
    <div role="tablist" id={id} className={className}>
      <div className="tab-pills-container">
        {Children.map(children, (child) => {
          if (isTabElement(child)) {
            return cloneElement(child, {
              onClick: () => handleTabClick(child.props.eventKey),
              onKeyDown: (event: React.KeyboardEvent) =>
                handleKeyDown(event, child.props.eventKey),
              ref: (el: HTMLButtonElement) => {
                if (el) {
                  tabRefs.current[child.props.eventKey] = el;
                }
              },
              role: "tab",
              "aria-selected": activeKey === child.props.eventKey,
              "aria-controls": `${id}-tabpanel-${child.props.eventKey}`,
              id: `${id}-tab-${child.props.eventKey}`,
            });
          }
          return null;
        })}
      </div>
      {Children.map(children, (child) => {
        if (isTabElement(child)) {
          return (
            <div
              key={child.props.eventKey}
              id={`${id}-tabpanel-${child.props.eventKey}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${child.props.eventKey}`}
              hidden={activeKey !== child.props.eventKey}
            >
              {child.props.children}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { title, disabled = false, className, ...restProps } = props;
  return (
    <button
      {...restProps}
      disabled={disabled}
      ref={ref}
      className={`font-bold min-w-28 text-fluid-micro-guided leading-fluid-micro-guided transition-all duration-200 py-3 px-7 ${className} ${
        props["aria-selected"] ? "active" : ""
      }`}
    >
      {title}
    </button>
  );
});

Tab.displayName = "Tab";

export { Tabs, Tab };
